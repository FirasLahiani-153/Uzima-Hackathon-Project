from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load model + dataset
try:
    model = joblib.load("disease_predictor.pkl")
    df = pd.read_csv("symbipredict_2022.csv")
    symptoms = [c for c in df.columns if c != "prognosis"]
    logger.info(f"Model loaded successfully with {len(symptoms)} symptoms")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    raise

# Input schema
class SymptomsInput(BaseModel):
    symptoms: list[str]

# Response schema
class PredictionResponse(BaseModel):
    disease: str
    confidence: float = None
    symptoms_used: list[str] = None

# FastAPI app
app = FastAPI(
    title="Uzima AI Disease Predictor",
    description="AI-powered disease prediction based on symptoms",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Uzima AI Disease Predictor API",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": True}

@app.get("/symptoms")
async def get_symptoms():
    """Get list of all available symptoms"""
    return {"symptoms": symptoms}

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: SymptomsInput):
    """Predict disease based on symptoms"""
    try:
        if not data.symptoms:
            raise HTTPException(status_code=400, detail="No symptoms provided")
        
        # Validate symptoms
        invalid_symptoms = [s for s in data.symptoms if s not in symptoms]
        if invalid_symptoms:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid symptoms: {invalid_symptoms}"
            )
        
        # Build full patient input
        patient = {col: int(col in data.symptoms) for col in symptoms}
        X_new = pd.DataFrame([patient])
        
        # Predict
        prediction = model.predict(X_new)[0]
        
        # Get prediction confidence if available
        confidence = None
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(X_new)[0]
            confidence = float(max(proba))
        
        return PredictionResponse(
            disease=prediction,
            confidence=confidence,
            symptoms_used=data.symptoms
        )
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)