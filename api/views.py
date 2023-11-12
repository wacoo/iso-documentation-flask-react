from flask import Blueprint, Flask, jsonify
from models.categories import Category
from models.deparments import Department
from models.users import User
from models.documents import Document
from sqlalchemy.orm import sessionmaker
from models.base import engine

Session = sessionmaker(bind=engine)
session = Session()

main_ap = Blueprint('main_api', __name__)
@main_ap.route('/')
def home():
    ''' shows all documents'''
    all = session.query(Document).all()
    docs = []
    for document in all:
        docs.append({'id': document.id, 'title': document.doc_title, 'description': document.doc_description, 'category': document.categories.name, 'department': document.department.name, 'created_at': document.created_at, 'updated_at': document.updated_at})
    return jsonify(docs)

@main_ap.route('/categories')
def category():
    ''' shows all categories'''
    all = session.query(Category).all()
    cats = []
    for category in all:
        cats.append({'id': category.id, 'name': category.name, 'created_at': category.created_at, 'updated_at': category.updated_at})
    return jsonify(cats)

@main_ap.route('/categories/<string:id>', endpoint='api_category')
def category(id):
    ''' shows all categories'''
    category = session.query(Category).filter_by(id=id).first()
    return jsonify({'id': category.id, 'name': category.name, 'created_at': category.created_at, 'updated_at': category.updated_at})

if __name__ == '__main__':
    app.run()