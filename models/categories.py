from sqlalchemy import create_engine, ForeignKey, String, Integer, Column, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from  models.base import Base
from uuid import uuid4
from datetime import datetime
class Category(Base):
    __tablename__ = 'categories'
    id = Column(String(36), primary_key=True)
    name = Column(String(45), unique=True)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    documents = relationship('Document', back_populates='category')
    def __init__(self, name):
        self.id = str(uuid4())
        self.name = name