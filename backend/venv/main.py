from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

# ------------------ MODELS ------------------

class User(BaseModel):
    email: str
    password: str

class PolicyRequest(BaseModel):
    location: str

# ------------------ AUTH ------------------

@app.post("/login")
def login(user: User):
    return {"message": "Login successful", "token": "dummy-token"}

# ------------------ AI PREMIUM ------------------

@app.post("/calculate-premium")
def calculate_premium(data: PolicyRequest):
    base = 30
    
    if data.location == "high-risk":
        base += 15
    elif data.location == "medium-risk":
        base += 5

    return {"weekly_premium": base}

# ------------------ TRIGGER ------------------

@app.get("/simulate-rain")
def simulate_rain():
    rainfall = random.randint(0, 100)

    if rainfall > 50:
        return {
            "trigger": True,
            "message": "Heavy rain detected",
            "payout": 500
        }
    
    return {"trigger": False, "message": "No disruption"}