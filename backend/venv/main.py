from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

from routes.auth import router as auth_router
from routes.claim import router as claim_router
from routes.policy import router as policy_router

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# CORS (IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(claim_router)
app.include_router(policy_router)