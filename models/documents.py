from sqlalchemy import create_engine, ForeignKey, String, Integer, Column, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from  models.base import Base
from uuid import uuid4
from datetime import datetime

class Document(Base):
    __tablename__ = 'documents'
    id = Column(String(36), primary_key=True)
    doc_title = Column(String(200))
    doc_description = Column(String(500))
    revision_no = Column(Integer)
    category_id = Column(String(36), ForeignKey('categories.id'))
    department_id = Column(String(36), ForeignKey('departments.id'))
    doc_type = Column(String(5))
    document_path = Column(String(255))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    category = relationship('Category', back_populates='documents')
    department = relationship('Department', back_populates='documents')
    def __init__(self, doc_title, doc_description, revision_no, category_id, department_id, doc_type, document_path):
        self.id = str(uuid4())
        self.doc_title = doc_title
        self.doc_description = doc_description
        self.revision_no = revision_no
        self.category_id = category_id
        self.department_id = department_id
        self.doc_type = doc_type
        self.document_path = document_path