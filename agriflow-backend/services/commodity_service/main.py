from fastapi import FastAPI, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from . import models, schemas, database
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AgriFlow Commodity Service")

@app.post("/", response_model=schemas.Commodity)
def create_commodity(commodity: schemas.CommodityCreate, db: Session = Depends(get_db)):
    new_commodity = models.Commodity(**commodity.dict())
    db.add(new_commodity)
    db.commit()
    db.refresh(new_commodity)
    return new_commodity

@app.get("/", response_model=List[schemas.Commodity])
def list_commodities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Commodity).offset(skip).limit(limit).all()
