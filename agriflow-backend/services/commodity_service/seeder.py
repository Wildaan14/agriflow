import csv
import httpx
import asyncio
import sys

# AgriFlow Commodity Seeder
# Usage: python seeder.py commodities.csv
# URL of the commodity service
BASE_URL = "http://localhost:8000/commodities"

async def seed_data(file_path):
    print(f"🌱 Starting AgriFlow Seeder for: {file_path}")
    
    try:
        with open(file_path, mode='r') as file:
            reader = csv.DictReader(file)
            async with httpx.AsyncClient() as client:
                for row in reader:
                    # Map CSV fields to API schema
                    payload = {
                        "commodity_type": row["type"],
                        "grade": row["grade"],
                        "quantity_kg": float(row["quantity"]),
                        "asking_price_per_kg": float(row["price"]),
                        "farmer_id": row["farmer_id"],
                        "ai_grade_confidence": float(row.get("confidence", 0.95))
                    }
                    
                    resp = await client.post(BASE_URL, json=payload)
                    if resp.status_code == 200:
                        print(f"✅ Success: {payload['commodity_type']} ({payload['quantity_kg']}kg)")
                    else:
                        print(f"❌ Failed: {payload['commodity_type']} - {resp.text}")
                        
    except FileNotFoundError:
        print(f"⚠️ Error: File {file_path} not found. Please provide a valid CSV.")
    except Exception as e:
        print(f"💥 Critical Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python seeder.py <path_to_csv>")
    else:
        asyncio.run(seed_data(sys.argv[1]))
