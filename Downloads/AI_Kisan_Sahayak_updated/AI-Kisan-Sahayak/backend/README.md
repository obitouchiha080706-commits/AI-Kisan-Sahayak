# AI Kisan Sahayak — FastAPI backend

This backend matches the frontend contract in `frontend/README.md`:
- `POST /api/analyze` — multipart fields: `image`, `crop`, `lang`
- `POST /api/chat` — JSON: `{"message": "...", "lang": "en" | "hi"}`

## 1. Requirements
- Python 3.10 or newer
- A Gemini API key from https://aistudio.google.com/apikey

The Gemini API currently offers a free tier for some models, with limits and model availability that can change. Check Google's pricing page before production use:
https://ai.google.dev/gemini-api/docs/pricing

## 2. Create a virtual environment

Open PowerShell in this `backend` folder:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run this for the current terminal only:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.venv\Scripts\Activate.ps1
```

## 3. Install packages

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 4. Add the secret API key

Copy `.env.example` to `.env`, then replace the placeholder with your key:

```env
GEMINI_API_KEY=your_real_key_here
```

Never paste this key into React files, GitHub, or the frontend `.env` file.

## 5. Start the backend

```powershell
uvicorn main:app --reload
```

Open:
- http://127.0.0.1:8000
- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/health

## 6. Connect the existing React frontend

In `frontend/.env`, set:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Restart Vite after changing `.env`:

```powershell
npm run dev
```

Keep the backend terminal running as well as the frontend terminal.

## Important accuracy note

The image endpoint uses a general multimodal AI model to give a preliminary visual assessment. It is NOT a specialist, validated crop-disease classifier and cannot guarantee a diagnosis. Lighting, image quality, crop variety, and local disease patterns can affect results. Confirm important treatment decisions with a local agriculture officer or Krishi Vigyan Kendra (KVK). Do not rely on this tool alone for pesticide decisions.
