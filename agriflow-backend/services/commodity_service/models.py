from sqlalchemy import Column, String, Integer, Boolean, Float, Text, Enum, DateTime, Date, ForeignKey, func, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class Commodity(Base):
    __tablename__ = "commodities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farmer_id = Column(UUID(as_uuid=True), index=True, nullable=False)
    commodity_type = Column(String(50), nullable=False)
    quantity_kg = Column(Float, nullable=False)
    grade = Column(Enum("A", "B", "C", name="commodity_grades"))
    asking_price_per_kg = Column(Float)
    available_from = Column(Date)
    status = Column(Enum("available", "matched", "sold", "expired", name="commodity_status"), default="available")
    ai_grade_confidence = Column(Float)
    photo_urls = Column(JSON)
    blockchain_hash = Column(String(64))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    commodity_id = Column(UUID(as_uuid=True), nullable=False)
    seller_id = Column(UUID(as_uuid=True), nullable=False)
    buyer_id = Column(UUID(as_uuid=True), nullable=False)
    quantity_kg = Column(Float)
    agreed_price_per_kg = Column(Float)
    total_amount = Column(Float)
    platform_fee = Column(Float)
    escrow_status = Column(Enum("pending", "paid", "shipped", "completed", "disputed", name="escrow_status"), default="pending")
    payment_method = Column(String(50))
    midtrans_order_id = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
