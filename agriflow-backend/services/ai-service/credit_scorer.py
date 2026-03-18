import pandas as pd
import random

class AgriScorer:
    def __init__(self):
        self.weights = {
            "quality_consistency": 0.4,
            "repayment_history": 0.3,
            "land_productivity": 0.2,
            "digital_footprint": 0.1
        }

    def calculate_score(self, features: dict) -> int:
        """
        Mocking an XGBoost classifier for credit risk.
        Returns a score between 300 and 850.
        """
        base_score = 300
        
        # Weighted sum simulation
        contribution = (
            features.get("quality_consistency", 0.5) * 400 +
            features.get("repayment_history", 0.5) * 300 +
            features.get("land_productivity", 0.5) * 200 +
            features.get("digital_footprint", 0.5) * 100
        )
        
        final_score = int(base_score + contribution)
        return min(max(final_score, 300), 850)

# Integration
from fastapi import FastAPI
app = FastAPI(title="AgriFlow Credit Scoring Service")

@app.post("/score")
async def get_score(farmer_id: str, data: dict):
    scorer = AgriScorer()
    score = scorer.calculate_score(data)
    
    tier = "C"
    if score > 750: tier = "A+"
    elif score > 650: tier = "A"
    elif score > 550: tier = "B"
    
    return {
        "farmer_id": farmer_id,
        "agri_score": score,
        "tier": tier,
        "eligible_for_loan": score > 500
    }
