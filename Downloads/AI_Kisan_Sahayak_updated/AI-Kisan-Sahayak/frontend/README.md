# AI Kisan Sahayak (frontend)

React + Vite app with a crop scanner, government scheme guide and AI assistant, in Hindi and English.

## Run
```
npm install
npm run dev
```

## Structure
- `src/pages` Home, CropScanner, Schemes, Chat, NotFound (each with its own CSS)
- `src/components` Layout (top bar, mobile tab bar, footer), Icon, ScanIllustration
- `src/i18n` language context and all UI text (`translations.js`)
- `src/data` schemes, diseases, chat knowledge, season tips (bilingual)
- `src/services` `api.js` switches between demo data and your backend

## Connect your AI backend
Copy `.env.example` to `.env` and set `VITE_API_URL`. Until then the scanner and chat run in
demo mode (sample results, clearly labelled in the UI).

- `POST /api/analyze` multipart (`image`, `crop`, `lang`) returns `{ name, severity, health, confidence, symptoms[], actions[], prevention[] }`
- `POST /api/chat` json (`message`, `lang`) returns `{ reply, link? }`

Keep API keys on the server, never in this frontend.
