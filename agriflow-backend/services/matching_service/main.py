from fastapi import FastAPI, Depends, HTTPException
from typing import List
import math
import os

app = FastAPI(title="AgriFlow Matching Service")

@app.post("/match")
async def find_matches(demand: dict, supplies: List[dict]):
    """
    Finds the best supply matches for a given demand using 
    weighted scores (Distance, Price, Quality).
    """
    matches = []
    for supply in supplies:
        # Haversine-ish distance
        dist = math.sqrt(
            (demand["lat"] - supply["lat"])**2 + 
            (demand["lng"] - supply["lng"])**2
        )
        
        # Scoring components (0-1 range)
        dist_score = 1 / (1 + dist)
        price_score = 1 - (supply["price"] / 100000) # Assuming max price limit
        quality_score = supply.get("quality_index", 0.5)
        
        total_score = (dist_score * 0.4) + (price_score * 0.3) + (quality_score * 0.3)
        
        matches.append({
            "supply_id": supply["id"],
            "match_score": round(total_score, 2),
            "distance_km": round(dist * 111, 1), # Approx conversion
            "sustainability_bonus": supply.get("eco_friendly", False)
        })
    
    # Sort by best match
    matches.sort(key=lambda x: x["match_score"], reverse=True)
    return matches[:5]

@app.get("/health")
async def health():
    return {"status": "ok"}
