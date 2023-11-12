from flask import Blueprint, Flask, jsonify, request
from models.categories import Category
from models.deparments import Department
from models.users import User
from models.documents import Document
from sqlalchemy.orm import sessionmaker
from models.base import engine

Session = sessionmaker(bind=engine)
session = Session()

main_ap = Blueprint('main_api', __name__)
@main_ap.route('/', methods=['GET'], strict_slashes=False)
def home():
    ''' shows all documents'''
    all = session.query(Document).all()
    docs = []
    for document in all:
        docs.append({'id': document.id, 'title': document.doc_title, 'description': document.doc_description, 'category': document.categories.name, 'department': document.department.name, 'created_at': document.created_at, 'updated_at': document.updated_at})
    return jsonify(docs)

@main_ap.route('/categories', methods=['GET'], strict_slashes=False)
def category():
    ''' shows all categories'''
    all = session.query(Category).all()
    cats = []
    for category in all:
        cats.append({'id': category.id, 'name': category.name, 'created_at': category.created_at, 'updated_at': category.updated_at})
    return jsonify(cats)

@main_ap.route('/categories/<string:id>', endpoint='cat_by_id', methods=['GET'], strict_slashes=False)
def category(id):
    ''' shows all categories'''
    category = session.query(Category).filter_by(id=id).first()
    return jsonify({'id': category.id, 'name': category.name, 'created_at': category.created_at, 'updated_at': category.updated_at})

# @main_ap.route('/categories', methods=['PUT'], strict_slashes=False)
# def category():
#     ''' update category name (not tested)'''
#     id = request.json['id']
#     name = request.json['name']
#     cat = session.query(Category).filter_by(id=id).first()
#     cat.name = name
#     session.commit()

@main_ap.route('/departments', endpoint='departments', methods=['GET'], strict_slashes=False)
def departments():
    ''' shows all departments'''
    all = session.query(Department).all()
    depts = []
    for dept in all:
        depts.append({'id': dept.id, 'name': dept.name, 'created_at': dept.created_at, 'updated_at': dept.updated_at})
    return jsonify(depts)

@main_ap.route('/departments/<string:id>', endpoint='dept_by_id', methods=['GET'], strict_slashes=False)
def department(id):
    ''' shows a department'''
    dept = session.query(Department).filter_by(id=id).first()
    return jsonify({'id': dept.id, 'name': dept.name, 'created_at': dept.created_at, 'updated_at': dept.updated_at})


if __name__ == '__main__':
    app.run()