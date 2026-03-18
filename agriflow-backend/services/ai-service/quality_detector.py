import random

class QualityDetector:
    def __init__(self):
        self.classes = ["Healthy", "Leaf Spot", "Fruit Rot", "Pest Damage"]
        self.grades = ["A", "B", "C"]

    def detect(self, image_url: str):
        """
        Mocking YOLOv8 object detection and classification.
        """
        # Inference simulation
        condition = random.choice(self.classes)
        grade = random.choice(self.grades)
        confidence = round(random.uniform(0.85, 0.99), 2)
        
        return {
            "condition": condition,
            "grade": grade,
            "confidence": confidence,
            "recommendation": "Aman untuk dijual" if grade == "A" else "Kualitas sedang, gunakan untuk olahan"
        }

# API
from fastapi import FastAPI
app = FastAPI(title="AgriFlow Vision Service")

@app.post("/detect")
async def image_detection(image_url: str):
    detector = QualityDetector()
    return detector.detect(image_url)
