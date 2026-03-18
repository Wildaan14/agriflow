from fastapi import FastAPI, List
from price_predictor import PricePredictor
from quality_detector import QualityDetector
from credit_scorer import CreditScorer

app = FastAPI(title="AgriFlow Unified AI Service")

@app.get("/predict/{commodity}")
async def get_prediction(commodity: str, history: List[float]):
    predictor = PricePredictor(commodity)
    preds = predictor.predict(history)
    return {
        "commodity": commodity,
        "predictions": preds,
        "confidence_interval": [0.85, 0.92],
        "model": predictor.model_version
    }

@app.post("/detect")
async def image_detection(image_url: str):
    detector = QualityDetector()
    return detector.detect(image_url)

@app.get("/credit-score/{farmer_id}")
async def get_credit_score(farmer_id: str):
    scorer = CreditScorer(farmer_id)
    return scorer.calculate_score()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-service"}
