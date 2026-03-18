from fastapi import FastAPI
import os

app = FastAPI(title="AgriFlow Notification Service")

@app.post("/whatsapp/send")
async def send_whatsapp(to: str, message: str):
    # Mocking Twilio API call
    return {
        "sid": f"SM{os.urandom(16).hex()}",
        "status": "queued",
        "provider": "Twilio/WhatsApp"
    }

@app.post("/voice/whisper")
async def process_voice(audio_url: str):
    # Mocking OpenAI Whisper for Voice-to-Text
    return {
        "text": "Saya punya cabai dua kwintal harga tiga puluh ribu per kilo",
        "confidence": 0.98,
        "language": "id"
    }
@app.get("/alerts")
async def get_alerts():
    # In production, this would fetch from a database or message queue
    return [
        {
            "id": "1",
            "severity": "danger",
            "title": "Defisit Beras (NTT)",
            "desc": "Stok menipis hingga < 5 hari. Rekomendasi: Operasi pasar Bulog segera.",
            "timestamp": "2026-03-18T17:00:00Z"
        },
        {
            "id": "2",
            "severity": "warning",
            "title": "Surplus Cabai (Jatim)",
            "desc": "Potensi harga anjlok. Rekomendasi: Distribusi ke wilayah defisit NTT.",
            "timestamp": "2026-03-18T16:30:00Z"
        },
        {
            "id": "3",
            "severity": "danger",
            "title": "Cuaca Ekstrem (Sumbar)",
            "desc": "Potensi gagal panen bawang merah 1200 Ha akibat curah hujan tinggi.",
            "timestamp": "2026-03-18T15:45:00Z"
        }
    ]
