import asyncio
import json
import os
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

load_dotenv()

APP_NAME = "AI Kisan Sahayak API"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()
MAX_IMAGE_BYTES = 10 * 1024 * 1024

# Frontend origins allowed to call this backend.
# Add your deployed frontend URL to FRONTEND_ORIGINS when deploying.
origins_text = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173"
)
allowed_origins = [item.strip() for item in origins_text.split(",") if item.strip()]

app = FastAPI(title=APP_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    lang: Literal["en", "hi"] = "en"


class ChatResponse(BaseModel):
    reply: str
    link: dict | None = None


def require_ai():
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="Gemini API key is missing. Add GEMINI_API_KEY to backend .env."
        )


def parse_json_response(text: str) -> dict:
    """Parse JSON returned by Gemini, including occasional code fences."""
    cleaned = (text or "").strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[-1]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        start, end = cleaned.find("{"), cleaned.rfind("}")
        if start >= 0 and end > start:
            return json.loads(cleaned[start:end + 1])
        raise HTTPException(status_code=502, detail="AI returned an unreadable response. Please try again.")


@app.get("/")
def home():
    return {"message": "AI Kisan Sahayak backend is running", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok", "ai_configured": client is not None, "model": GEMINI_MODEL}


@app.post("/api/analyze")
async def analyze_crop(
    image: UploadFile = File(...),
    crop: str = Form("other"),
    lang: Literal["en", "hi"] = Form("en"),
):
    """
    Accepts the exact multipart fields expected by the existing React app:
    image, crop, lang.
    """
    require_ai()

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Please upload an image file.")

    image_bytes = await image.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="The uploaded image is empty.")
    if len(image_bytes) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image must be 10 MB or smaller.")

    language = "Hindi" if lang == "hi" else "English"
    prompt = f"""
You are an agricultural visual-assistance assistant for farmers.
The selected crop is: {crop}.
Look carefully at the uploaded crop image. Answer in {language}.

Return ONLY valid JSON with exactly these keys:
{{
  "name": "short likely issue name, or 'Unable to assess' if unclear",
  "severity": "none, mild, moderate, or severe",
  "health": 0,
  "confidence": 0,
  "symptoms": ["visible observation 1"],
  "actions": ["safe practical next step 1"],
  "prevention": ["general prevention step 1"]
}}

Rules:
- This is a preliminary visual estimate, NOT a confirmed diagnosis.
- Do not claim certainty. If the photo is unclear, say Unable to assess and keep confidence low.
- confidence and health must be whole numbers from 0 to 100. They are rough AI estimates, not lab measurements.
- severity must be exactly none, mild, moderate, or severe.
- Mention only visible symptoms; do not invent symptoms.
- Give 2 to 4 simple, safe actions and prevention steps.
- Do not prescribe pesticide/fungicide brands, chemical doses, or unsafe mixing instructions.
- Recommend confirmation from a local agriculture officer/Krishi Vigyan Kendra before treatment.
- If the image is not a crop/plant image, say so in name and explain in symptoms.
"""

    try:
        part = types.Part.from_bytes(
            data=image_bytes,
            mime_type=image.content_type
        )
        response = await asyncio.to_thread(
            client.models.generate_content,
            model=GEMINI_MODEL,
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
        # Do not expose API keys or raw provider details to the browser.
        print(f"Gemini analyze error: {type(exc).__name__}: {exc}")
        raise HTTPException(status_code=502, detail="Crop analysis service failed. Please try again later.")

    severity = str(data.get("severity", "none")).lower()
    if severity not in {"none", "mild", "moderate", "severe"}:
        severity = "none"

    def safe_list(value):
        if not isinstance(value, list):
            return []
        return [str(item)[:500] for item in value[:6]]

    return {
        "name": str(data.get("name", "Unable to assess"))[:160],
        "severity": severity,
        "health": max(0, min(100, int(data.get("health", 0)))),
        "confidence": max(0, min(100, int(data.get("confidence", 0)))),
        "symptoms": safe_list(data.get("symptoms")),
        "actions": safe_list(data.get("actions")),
        "prevention": safe_list(data.get("prevention")),
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    require_ai()

    language = "Hindi" if request.lang == "hi" else "English"
    prompt = f"""
You are AI Kisan Sahayak, a careful and friendly assistant for farmers in India.
Reply in {language}, using simple language and short, practical steps.
The farmer asks: {request.message}

Guidance:
- Help with crops, soil, irrigation, pests, diseases, weather-related farm precautions,
  seeds, fertilizers, and general Indian farmer support.
- Never invent government scheme eligibility, deadlines, amounts, or official links.
  If details may change, tell the farmer to verify with the official government portal
  or their local agriculture office.
- Do not prescribe pesticide/fungicide chemical doses or unsafe mixtures.
- For serious crop damage, recommend contacting the local agriculture officer or KVK.
- Do not claim to be a human expert or to have inspected a field.
"""
    try:
        response = await asyncio.to_thread(
            client.models.generate_content,
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(temperature=0.4),
        )
        reply = (response.text or "").strip()
        if not reply:
            raise ValueError("Empty AI response")
        return {"reply": reply, "link": None}
    except Exception as exc:
        print(f"Gemini chat error: {type(exc).__name__}: {exc}")
        raise HTTPException(status_code=502, detail="AI assistant is temporarily unavailable. Please try again.")
