from fastapi import FastAPI, HTTPException
import os
import httpx

app = FastAPI(title="AgriFlow Payment Service")

import base64

MIDTRANS_SERVER_KEY = os.getenv("MIDTRANS_SERVER_KEY", "VT-server-fake-key")
SNAP_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions"

@app.post("/payments/create")
async def create_payment(transaction_id: str, amount: float):
    # Real Midtrans Snap Integration
    auth_header = base64.b64encode(f"{MIDTRANS_SERVER_KEY}:".encode()).decode()
    
    payload = {
        "transaction_details": {
            "order_id": transaction_id,
            "gross_amount": int(amount)
        },
        "credit_card": {
            "secure": True
        }
    }
    
    if "fake" in MIDTRANS_SERVER_KEY:
        return {
            "token": f"mock-snap-{transaction_id}",
            "redirect_url": f"https://app.sandbox.midtrans.com/snap/v2/vtweb/mock-snap-{transaction_id}",
            "message": "Using mock credentials. Set real keys in .env"
        }

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            SNAP_URL, 
            json=payload,
            headers={"Authorization": f"Basic {auth_header}", "Content-Type": "application/json"}
        )
        return resp.json()

@app.post("/payments/webhook")
async def payment_webhook(payload: dict):
    # Process Midtrans notification
    status = payload.get("transaction_status")
    order_id = payload.get("order_id")
    return {"status": "processed", "order_id": order_id}
