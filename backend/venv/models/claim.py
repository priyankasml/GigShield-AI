from sqlalchemy import Column, Integer, String
from database import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    type = Column(String)
    amount = Column(Integer)
    status = Column(String, default="pending")