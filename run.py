import os
import sys
from flask import Flask, jsonify
from models.categories import Category
from models.deparments import Department
from models.users import User
from models.documents import Document
from sqlalchemy.orm import sessionmaker
from models.base import engine
from api.app import app

Session = sessionmaker(bind=engine)
session = Session()

if __name__ == '__main__':
    app.run()