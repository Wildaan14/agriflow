from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    phone: str
    name: Optional[str] = None
    role: str
    language: str = "id"

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID
    agri_score: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    phone: Optional[str] = None
