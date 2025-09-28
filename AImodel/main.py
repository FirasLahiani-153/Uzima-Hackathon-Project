from fastapi import FastAPI
from pydantic import BaseModel
import joblib, pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Load model + dataset
model = joblib.load("disease_predictor.pkl")
df = pd.read_csv("symbipredict_2022.csv")
symptoms = [c for c in df.columns if c != "prognosis"]

# Input schema
class SymptomsInput(BaseModel):
    symptoms: list[str]

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def predict(data: SymptomsInput):
    # Build full patient input
    patient = {col: int(col in data.symptoms) for col in symptoms}
    X_new = pd.DataFrame([patient])
    prediction = model.predict(X_new)[0]
    return {"disease": prediction}