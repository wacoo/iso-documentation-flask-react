from sqlalchemy import create_engine, ForeignKey, String, Integer, Column, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from  models.base import Base
from uuid import uuid4
from datetime import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(String(36), primary_key=True)
    first_name = Column(String(45))
    middle_name = Column(String(45))
    last_name = Column(String(45))
    access_level = Column(Integer)
    active = Column(Boolean)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    def __init__(self, first_name, middle_name, last_name, access_level, active):
        self.id = str(uuid4())
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.access_level = access_level
        self.active = active
