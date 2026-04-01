from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.user import User

router = APIRouter()

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# SIGNUP
@router.post("/signup")
def signup(data: dict, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data["email"]).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        role=data.get("role", "worker")
    )

    db.add(user)
    db.commit()

    return {
        "token": "demo_token",
        "role": user.role
    }


# LOGIN
@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data["email"]).first()

    if not user or user.password != data["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "token": "demo_token",
        "role": user.role
    }