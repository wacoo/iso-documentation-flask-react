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
        docs.append({'id': document.id, 'title': document.doc_title, 'description': document.doc_description, 'category': document.categories.name,
                    'department': document.department.name, 'created_at': document.created_at, 'updated_at': document.updated_at})
    return jsonify(docs)


@main_ap.route('/categories', methods=['GET'], strict_slashes=False)
def category():
    ''' shows all categories'''
    all = session.query(Category).all()
    cats = []
    for category in all:
        cats.append({'id': category.id, 'name': category.name,
                    'created_at': category.created_at, 'updated_at': category.updated_at})
    return jsonify(cats)


@main_ap.route('/categories/<string:id>', endpoint='cat_by_id', methods=['GET'], strict_slashes=False)
def category(id):
    ''' shows a category based on id'''
    category = session.query(Category).filter_by(id=id).first()
    return jsonify({'id': category.id, 'name': category.name, 'created_at': category.created_at, 'updated_at': category.updated_at})


@main_ap.route('/categories', methods=['PUT'], strict_slashes=False)
def update_category():
    ''' update category name '''
    data = request.get_json()
    print(data)
    id = data['id']
    name = data['name']
    cat = session.query(Category).filter_by(id=id).first()
    cat = session.query(Category).filter_by(id=id).first()
    if cat:
        cat.name = name
        session.commit()
        return jsonify({'message': 'Category name updated successfully'}), 200
    else:
        return jsonify({'message': 'Category not found'}), 404


@main_ap.route('/categories', methods=['POST'], strict_slashes=False)
def create_category():
    ''' create a new category '''
    data = request.get_json()
    name = data['name']
    try:
        cat = Category(name=name)
        session.add(cat)
        session.commit()
        return jsonify({'message': 'Category created successfully', 'result': {'id': cat.id, 'name': cat.name}}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Category not created! ' + str(e)}), 500


@main_ap.route('/departments', endpoint='departments', methods=['GET'], strict_slashes=False)
def departments():
    ''' shows all departments'''
    all = session.query(Department).all()
    depts = []
    for dept in all:
        depts.append({'id': dept.id, 'name': dept.name,
                     'created_at': dept.created_at, 'updated_at': dept.updated_at})
    return jsonify(depts)


@main_ap.route('/departments/<string:id>', endpoint='dept_by_id', methods=['GET'], strict_slashes=False)
def department(id):
    ''' shows a department'''
    dept = session.query(Department).filter_by(id=id).first()
    return jsonify({'id': dept.id, 'name': dept.name, 'created_at': dept.created_at, 'updated_at': dept.updated_at})


@main_ap.route('/departments', methods=['PUT'], strict_slashes=False)
def update_department():
    ''' update department name '''
    data = request.get_json()
    id = data['id']
    name = data['name']
    dept = session.query(Department).filter_by(id=id).first()
    if dept:
        dept.name = name
        session.commit()
        return jsonify({'message': 'Department name updated successfully'}), 200
    else:
        return jsonify({'message': 'Department not found'}), 404


@main_ap.route('/departments', methods=['POST'], strict_slashes=False)
def create_department():
    ''' create a new department '''
    data = request.get_json()
    name = data['name']
    try:
        dept = Department(name=name)
        session.add(dept)
        session.commit()
        return jsonify({'message': 'Department created successfully', 'result': {'id': dept.id, 'name': dept.name}}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Department not created! ' + str(e)}), 500


@main_ap.route('/documents', endpoint='documents', methods=['GET'], strict_slashes=False)
def documents():
    ''' shows all documents'''
    all = session.query(Document).all()
    docs = []
    for doc in all:
        docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                    'category': doc.category.name, 'department': doc.department.name,
                     'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                     'updated_at': doc.updated_at})
    return jsonify(docs)


@main_ap.route('/documents/by', methods=['GET'], strict_slashes=False)
def document():
    ''' shows a document based on id, name, date, category or department'''
    id = request.args.get('id')
    title = request.args.get('title')
    category = request.args.get('category')
    department = request.args.get('department')
    if id:
        doc = session.query(Document).filter_by(id=id).first()
        return jsonify({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                        'category': doc.category.name, 'department': doc.department.name,
                        'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                        'updated_at': doc.updated_at})
    elif title:
        all = session.query(Document).filter(
            Document.doc_title.like(f'%{title}%')).all()
        docs = []
        for doc in all:
            docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                        'category': doc.category.name, 'department': doc.department.name,
                         'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                         'updated_at': doc.updated_at})
        return jsonify(docs)

    elif category:
        all = session.query(Document).join(Document.category).filter(
            Category.name == category).all()
        docs = []
        for doc in all:
            docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                        'category': doc.category.name, 'department': doc.department.name,
                         'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                         'updated_at': doc.updated_at})
        return jsonify(docs)

    elif department:
        all = session.query(Document).join(Document.department).filter(
            Department.name == department).all()
        docs = []
        for doc in all:
            docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                        'category': doc.category.name, 'department': doc.department.name,
                         'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                         'updated_at': doc.updated_at})
        return jsonify(docs)


@main_ap.route('/documents', methods=['POST'], strict_slashes=False)
def create_document():
    ''' create a new document '''
    data = request.get_json()
    doc_title = data['doc_title']
    doc_description = data['doc_description']
    category_id = data['category_id']
    department_id = data['department_id']
    revision_no = data['revision_no']
    doc_type = data['doc_type']
    document = data['document'].encode('utf-8')

    try:
        doc = Document(
            doc_title=doc_title,
            doc_description=doc_description,
            revision_no=revision_no,
            category_id=category_id,
            department_id=department_id,
            doc_type=doc_type,
            document=document
        )
        session.add(doc)
        session.commit()
        return jsonify({'message': 'Document created successfully', 'result': {'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                        'category': doc.category.name, 'department': doc.department.name,
                                                                               'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                                                                               'updated_at': doc.updated_at}}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Department not created! ' + str(e)}), 500


if __name__ == '__main__':
    app.run()
