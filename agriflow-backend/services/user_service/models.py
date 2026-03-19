from sqlalchemy import Column, String, Integer, Boolean, Float, Text, Enum, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone = Column(String(15), unique=True, index=True, nullable=False)
    name = Column(String(100))
    role = Column(Enum("farmer", "buyer", "distributor", "gov", "admin", name="user_roles"), nullable=False)
    language = Column(String(10), default="id")
    agri_score = Column(Integer, default=0)
    location_province = Column(String(100))
    location_kabupaten = Column(String(100))
    lat = Column(Float)
    lng = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    land_area_ha = Column(Float)
    primary_commodities = Column(JSON)
    has_insurance = Column(Boolean, default=False)
    credit_score = Column(Integer, default=300)
    bank_account = Column(JSON) # Encrypted string usually
