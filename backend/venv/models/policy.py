from sqlalchemy import Column, Integer, String
from database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    policy_name = Column(String)
    status = Column(String)