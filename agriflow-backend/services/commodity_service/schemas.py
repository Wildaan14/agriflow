from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime, date

class CommodityBase(BaseModel):
    commodity_type: str
    quantity_kg: float
    grade: str
    asking_price_per_kg: float
    available_from: date

class CommodityCreate(CommodityBase):
    farmer_id: UUID

class Commodity(CommodityBase):
    id: UUID
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
