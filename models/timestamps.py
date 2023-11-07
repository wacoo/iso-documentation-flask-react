from sqlalchemy import create_engine, ForeignKey, String, Integer, Column, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from  models.base import Base
from uuid import uuid4
from datetime import datetime

class Timestamp(Base):
    __tablename__ = 'timestamps'
    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey('users.id'))
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    user = relationship('User', back_populates='timestamps')

    def __init__(self, user_id):
        self.id = str(uuid4())
        self.user_id = user_id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()