from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import service logic (Simplified for Monolith)
# In a real monolith, we'd import APIRouters from each sub-directory.
from services.user_service import main as user_service
from services.commodity_service import main as commodity_service
from services.ai_service import main as ai_service
from services.payment_service import main as payment_service
from services.insurance_service import main as insurance_service
from services.matching_service import main as matching_service
from services.notification_service import main as notification_service
from services.blockchain_service import main as blockchain_service

app = FastAPI(title="AgriFlow Master Monolith", version="1.0.0")

# Configure CORS for Production (Vercel/Render)
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mounting services as sub-applications
app.mount("/users", user_service.app)
app.mount("/commodities", commodity_service.app)
app.mount("/ai", ai_service.app)
app.mount("/payments", payment_service.app)
app.mount("/insurance", insurance_service.app)
app.mount("/matching", matching_service.app)
app.mount("/notifications", notification_service.app)
app.mount("/blockchain", blockchain_service.app)

@app.get("/")
async def root():
    return {
        "message": "AgriFlow Master API is Live",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
