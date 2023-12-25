from sqlalchemy import create_engine, ForeignKey, String, Integer, Column, Boolean, TIMESTAMP, func, text, DateTime
from sqlalchemy.orm import relationship
from  models.base import Base
from uuid import uuid4
from datetime import datetime
class Category(Base):
    __tablename__ = 'categories'
    id = Column(String(36), primary_key=True)
    name = Column(String(45), unique=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    documents = relationship('Document', back_populates='category')
    def __init__(self, name):
        self.id = str(uuid4())
        self.name = name