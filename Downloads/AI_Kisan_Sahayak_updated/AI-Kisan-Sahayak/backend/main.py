import asyncio
import json
import os
import random
from typing import Literal

from dotenv import load_dotenv
from fastapi import (
    FastAPI,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

# =====================================================
# CONFIGURATION
# =====================================================

load_dotenv()

APP_NAME = "AI Kisan Sahayak API"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()

GEMINI_FALLBACK_MODEL = os.getenv(
    "GEMINI_FALLBACK_MODEL", "gemini-2.5-flash-lite"
).strip()

MAX_IMAGE_BYTES = 10 * 1024 * 1024

MAX_RETRIES = 2

# =====================================================
# CORS
# =====================================================

origins_text = os.getenv(
    "FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
)

allowed_origins = [item.strip() for item in origins_text.split(",") if item.strip()]

app = FastAPI(title=APP_NAME, version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# =====================================================
# GEMINI CLIENT
# =====================================================

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None


def require_ai():
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="Gemini API key is missing. Configure GEMINI_API_KEY.",
        )


# =====================================================
# REQUEST MODELS
# =====================================================


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)

    lang: Literal["en", "hi"] = "en"


class ChatResponse(BaseModel):
    reply: str
    link: dict | None = None


# =====================================================
# GEMINI ERROR HANDLING
# =====================================================


def is_temporary_error(exc):

    code = getattr(exc, "code", None)

    error_text = str(exc).lower()

    temporary_codes = {408, 429, 500, 502, 503, 504}

    temporary_messages = [
        "503",
        "429",
        "500",
        "502",
        "504",
        "unavailable",
        "resource_exhausted",
        "deadline_exceeded",
        "timeout",
        "temporarily",
        "overloaded",
    ]

    return code in temporary_codes or any(
        item in error_text for item in temporary_messages
    )


async def generate_with_fallback(contents, config):

    require_ai()

    models = [GEMINI_MODEL]

    if GEMINI_FALLBACK_MODEL and GEMINI_FALLBACK_MODEL != GEMINI_MODEL:
        models.append(GEMINI_FALLBACK_MODEL)

    last_error = None

    for model in models:

        for attempt in range(MAX_RETRIES):

            try:

                print(f"Gemini model: {model}, " f"attempt: {attempt + 1}")

                response = await asyncio.to_thread(
                    client.models.generate_content,
                    model=model,
                    contents=contents,
                    config=config,
                )

                if not (response.text or "").strip():
                    raise ValueError("Gemini returned an empty response")

                print(f"Gemini success using model: {model}")

                return response

            except Exception as exc:

                last_error = exc

                print(f"Gemini error on {model}: " f"{type(exc).__name__}: {exc}")

                if not is_temporary_error(exc):
                    raise

                if attempt < MAX_RETRIES - 1:

                    delay = 2**attempt + random.uniform(0, 1)

                    print(f"Retrying in {delay:.1f} seconds")

                    await asyncio.sleep(delay)

    print("All Gemini models failed.")

    raise last_error


# =====================================================
# JSON RESPONSE PARSER
# =====================================================


def parse_json_response(text: str) -> dict:

    cleaned = (text or "").strip()

    if cleaned.startswith("```"):

        cleaned = cleaned.split("\n", 1)[-1]

        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]

    try:

        return json.loads(cleaned)

    except json.JSONDecodeError:

        start = cleaned.find("{")
        end = cleaned.rfind("}")

        if start >= 0 and end > start:

            try:
                return json.loads(cleaned[start : end + 1])

            except json.JSONDecodeError:
                pass

        raise HTTPException(
            status_code=502, detail="AI returned an unreadable response."
        )


# =====================================================
# HEALTH CHECK
# =====================================================


@app.get("/")
def home():

    return {
        "message": "AI Kisan Sahayak backend is running",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health():

    return {
        "status": "ok",
        "ai_configured": client is not None,
        "primary_model": GEMINI_MODEL,
        "fallback_model": GEMINI_FALLBACK_MODEL,
    }


# =====================================================
# CROP ANALYSIS
# =====================================================


@app.post("/api/analyze")
async def analyze_crop(
    image: UploadFile = File(...),
    crop: str = Form("other"),
    lang: Literal["en", "hi"] = Form("en"),
):

    require_ai()

    if not image.content_type or not image.content_type.startswith("image/"):

        raise HTTPException(status_code=415, detail="Please upload an image file.")

    image_bytes = await image.read()

    if not image_bytes:

        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    if len(image_bytes) > MAX_IMAGE_BYTES:

        raise HTTPException(status_code=413, detail="Image must be 10 MB or smaller.")

    language = "Hindi" if lang == "hi" else "English"

    prompt = f"""
You are AI Kisan Sahayak, an agricultural
visual assistance assistant for Indian farmers.

Selected crop: {crop}

Analyze the uploaded crop image carefully.

Answer in {language}.

Return ONLY valid JSON with exactly these keys:

{{
  "name": "likely issue name",
  "severity": "none, mild, moderate, or severe",
  "health": 0,
  "confidence": 0,
  "symptoms": ["visible observation"],
  "actions": ["safe practical action"],
  "prevention": ["prevention step"]
}}

IMPORTANT RULES:

1. This is a preliminary visual estimate,
   NOT a confirmed diagnosis.

2. Do not claim certainty.

3. If the image is unclear, say
   "Unable to assess".

4. Health and confidence must be
   whole numbers from 0 to 100.

5. Mention only visible symptoms.

6. Give 2 to 4 simple and safe actions.

7. Do not prescribe pesticide brands,
   chemical doses or unsafe mixtures.

8. Recommend confirmation from a local
   agriculture officer or KVK.

9. If image is not a plant or crop image,
   clearly mention that.
"""

    try:

        part = types.Part.from_bytes(data=image_bytes, mime_type=image.content_type)

        response = await generate_with_fallback(
            contents=[prompt, part],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )

        data = parse_json_response(response.text or "")

    except HTTPException:
        raise

    except Exception as exc:

        print(f"Crop analysis failed: " f"{type(exc).__name__}: {exc}")

        raise HTTPException(
            status_code=503,
            detail=(
                "Crop analysis is temporarily unavailable. " "Please try again later."
            ),
        )

    severity = str(data.get("severity", "none")).lower()

    if severity not in {"none", "mild", "moderate", "severe"}:

        severity = "none"

    def safe_number(value, default=0):

        try:
            return max(0, min(100, int(value)))

        except (ValueError, TypeError):
            return default

    def safe_list(value):

        if not isinstance(value, list):
            return []

        return [str(item)[:500] for item in value[:6]]

    return {
        "name": str(data.get("name", "Unable to assess"))[:160],
        "severity": severity,
        "health": safe_number(data.get("health")),
        "confidence": safe_number(data.get("confidence")),
        "symptoms": safe_list(data.get("symptoms")),
        "actions": safe_list(data.get("actions")),
        "prevention": safe_list(data.get("prevention")),
    }


# =====================================================
# AI FARMER CHAT
# =====================================================


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    require_ai()

    message = request.message.strip()

    if not message:

        raise HTTPException(status_code=400, detail="Please enter a message.")

    language = "Hindi" if request.lang == "hi" else "English"

    prompt = f"""
You are AI Kisan Sahayak,
a friendly and careful agricultural assistant
for farmers in India.

Farmer's language: {language}

Farmer's question:
{message}

INSTRUCTIONS:

1. Reply in {language}.

2. Use simple language that farmers
   can easily understand.

3. Give short, practical and helpful answers.

4. Help with:
   - Crops
   - Soil
   - Irrigation
   - Pests
   - Plant diseases
   - Seeds
   - Fertilizers
   - Farming practices
   - Indian government schemes

5. Never invent government scheme eligibility,
   deadlines, amounts or official links.

6. For changing government information,
   recommend checking the official portal.

7. Never prescribe unsafe pesticide doses
   or chemical mixtures.

8. For serious crop damage, recommend
   contacting a local agriculture officer
   or Krishi Vigyan Kendra.

9. Never claim to be a human expert.

10. Be polite and supportive.
"""

    try:

        response = await generate_with_fallback(
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
            ),
        )

        reply = (response.text or "").strip()

        if not reply:

            raise ValueError("Empty AI response")

        return {"reply": reply, "link": None}

    except HTTPException:
        raise

    except Exception as exc:

        print(f"Gemini chat error: " f"{type(exc).__name__}: {exc}")

        raise HTTPException(
            status_code=503,
            detail=(
                "AI assistant is temporarily unavailable. " "Please try again shortly."
            ),
        )


# =====================================================
# STARTUP INFORMATION
# =====================================================


@app.on_event("startup")
async def startup_event():

    print("=" * 50)
    print("AI KISAN SAHAYAK BACKEND STARTED")
    print("=" * 50)

    print(f"Gemini API configured: " f"{client is not None}")

    print(f"Primary model: {GEMINI_MODEL}")

    print(f"Fallback model: {GEMINI_FALLBACK_MODEL}")

    print(f"Allowed origins: {allowed_origins}")

    print("=" * 50)
