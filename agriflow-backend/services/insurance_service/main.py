from fastapi import FastAPI
import os
import random
import httpx

app = FastAPI(title="AgriFlow Insurance Service")

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "mock_key")
WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.get("/weather/check")
async def check_weather(lat: float, lng: float):
    if WEATHER_API_KEY == "mock_key":
        # Realistic fallback simulation
        conditions = ["Clear", "Clouds", "Drizzle", "Rain", "Thunderstorm"]
        condition = random.choice(conditions)
        risk_level = "HIGH" if condition in ["Rain", "Thunderstorm"] else "LOW"
        return {
            "source": "simulation",
            "condition": condition,
            "risk_level": risk_level,
            "payout_eligible": risk_level == "HIGH"
        }
    
    async with httpx.AsyncClient() as client:
        resp = await client.get(WEATHER_URL, params={
            "lat": lat, "lon": lng, "appid": WEATHER_API_KEY
        })
        data = resp.json()
        main_weather = data["weather"][0]["main"]
        risk_level = "HIGH" if main_weather in ["Rain", "Thunderstorm", "Extreme"] else "LOW"
        return {
            "source": "OpenWeatherMap",
            "condition": main_weather,
            "risk_level": risk_level,
            "payout_eligible": risk_level == "HIGH"
        }

@app.get("/insurance/risk/{region}")
async def check_risk(region: str):
    # Simulate historical weather analysis
    risk_score = random.uniform(0, 1)
    status = "Low Risk" if risk_score < 0.3 else "Moderate" if risk_score < 0.7 else "High Risk"
    return {
        "region": region,
        "risk_score": round(risk_score, 2),
        "status": status,
        "recommendation": "Eligible for Parametric Insurance" if risk_score < 0.8 else "Requires Manual Inspection"
    }

@app.post("/insurance/register")
async def register_policy(user_id: str, commodity_type: str, hectares: float):
    # Mocking smart contract insurance registration
    policy_id = f"POL-{random.randint(1000, 9999)}"
    premium = (hectares * 50000) # Simple calculation
    return {
        "policy_id": policy_id,
        "status": "Active (Smart Contract)",
        "premium_idr": premium,
        "coverage_start": "2026-03-20"
    }
