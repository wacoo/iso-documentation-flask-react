from flask import Blueprint, Flask, jsonify, request, send_file, send_from_directory, current_app
from werkzeug.utils import secure_filename
from models.categories import Category
from models.deparments import Department
from models.users import User
from models.documents import Document
from sqlalchemy.orm import sessionmaker
from api.decorators import viewer_required, editor_required, admin_required
from models.base import engine
from sqlalchemy import exc
import traceback
import io
import os

Session = sessionmaker(bind=engine)
session = Session()

main_ap = Blueprint('main_api', __name__)

UPLOAD_DIRECTORY = os.path.join(main_ap.root_path, 'static', 'uploads')

@main_ap.route('/', methods=['GET'], strict_slashes=False)
@viewer_required
def home():
    ''' shows all documents'''
    try:
        all = session.query(Document).all()
        docs = []
        for document in all:
            docs.append({'id': document.id, 'title': document.doc_title, 'revision': document.revision_no, 'description': document.doc_description, 'category': document.categories.name,
                        'department': document.department.name, 'created_at': document.created_at, 'updated_at': document.updated_at})
        print(docs)
        return jsonify(docs)
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Document not fetched! ' + str(e)}), 500


@main_ap.route('/categories', methods=['GET'], strict_slashes=False)
@viewer_required
def category():
    ''' shows all categories'''
    try:            
        all = session.query(Category).all()
        cats = []
        for category in all:
            cats.append({'id': category.id, 'name': category.name,
                         'created_at': category.created_at, 'updated_at': category.updated_at})
        return jsonify(cats)
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Categories not fetched! ' + str(e)}), 500


@main_ap.route('/categories/<string:id>', endpoint='cat_by_id', methods=['GET'], strict_slashes=False)
@viewer_required
def category(id):
    ''' shows a category based on id'''
    try:
        category = session.query(Category).filter_by(id=id).first()
        return jsonify({'id': category.id, 'name': category.name, 'created_at': category.created_at, 'updated_at': category.updated_at})
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Category not fetched! ' + str(e)}), 500

@main_ap.route('/categories', methods=['PUT'], strict_slashes=False)
@editor_required
def update_category():
    ''' update category name '''
    try:
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
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Category not updated! ' + str(e)}), 500


@main_ap.route('/categories', methods=['POST'], strict_slashes=False)
@editor_required
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
@viewer_required
def departments():
    ''' shows all departments'''
    try:
        all = session.query(Department).all()
        depts = []
        for dept in all:
            depts.append({'id': dept.id, 'name': dept.name,
                          'created_at': dept.created_at, 'updated_at': dept.updated_at})
        return jsonify(depts)
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Category not fetched! ' + str(e)}), 500


@main_ap.route('/departments/<string:id>', endpoint='dept_by_id', methods=['GET'], strict_slashes=False)
@viewer_required
def department(id):
    ''' shows a department'''
    try:
        dept = session.query(Department).filter_by(id=id).first()
        return jsonify({'id': dept.id, 'name': dept.name, 'created_at': dept.created_at, 'updated_at': dept.updated_at})
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Department not fetched! ' + str(e)}), 500


@main_ap.route('/departments', methods=['PUT'], strict_slashes=False)
@editor_required
def update_department():
    ''' update department name '''
    try:
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
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Departments not fetched! ' + str(e)}), 500


@main_ap.route('/departments', methods=['POST'], strict_slashes=False)
@editor_required
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
@viewer_required
def documents():
    ''' shows all documents'''
    try:
        all = session.query(Document).all()
        docs = []
        for doc in all:
            docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                        'category': doc.category.name, 'department': doc.department.name,
                        'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                        'updated_at': doc.updated_at})
        return jsonify(docs)
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Documents not fetched! ' + str(e)}), 500


@main_ap.route('/documents/by', methods=['GET'], strict_slashes=False)
@viewer_required
def document():
    ''' shows a document based on id, name, date, category or department'''
    try:
        dtype = request.args.get('type')
        title = request.args.get('title')
        category = request.args.get('category')
        department = request.args.get('department')
        if dtype:
            all = session.query(Document).filter(
                Document.doc_type == dtype).all()
            docs = []
            for doc in all:
                docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                            'category': doc.category.name, 'department': doc.department.name,
                            'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                            'updated_at': doc.updated_at})
            return jsonify(docs)
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
        else:
            all = session.query(Document).all()
            docs = []
            for doc in all:
                docs.append({'id': doc.id, 'title': doc.doc_title, 'description': doc.doc_description,
                            'category': doc.category.name, 'department': doc.department.name,
                            'revision_no': doc.revision_no, 'document_type': doc.doc_type, 'created_at': doc.created_at,
                            'updated_at': doc.updated_at})
            return jsonify(docs)
    except Exception as e:
            session.rollback()
            return jsonify({'error': 'Documents not fetched! ' + str(e)}), 500


@main_ap.route('/documents', methods=['POST'], strict_slashes=False)
@editor_required
def create_document():
    doc_title = request.form.get('doc_title')
    doc_description = request.form.get('doc_description')
    category_id = request.form.get('category_id')
    department_id = request.form.get('department_id')
    revision_no = request.form.get('revision_no')
    doc_type = request.form.get('doc_type')
    document = request.files.get('document')

    try:
        if document:
            document_path = os.path.join(UPLOAD_DIRECTORY, secure_filename(document.filename))
            print("Document path:", document_path)
            if not os.path.exists(UPLOAD_DIRECTORY):
                os.makedirs(UPLOAD_DIRECTORY)
            document.save(document_path)

            doc = Document(
                doc_title=doc_title,
                doc_description=doc_description,
                revision_no=revision_no,
                category_id=category_id,
                department_id=department_id,
                doc_type=doc_type,
                document_path=document_path
            )

            session.add(doc)
            session.commit()

            return jsonify({'message': 'Document created successfully', 'result': {
                'id': doc.id,
                'title': doc.doc_title,
                'description': doc.doc_description,
                'category': doc.category.name,
                'department': doc.department.name,
                'revision_no': doc.revision_no,
                'document_type': doc.doc_type,
                'created_at': doc.created_at,
                'updated_at': doc.updated_at
            }}), 201

        else:
            return jsonify({'error': 'Document not provided'}), 400

    except Exception as e:
        session.rollback()
        traceback.print_exc()
        return jsonify({'error': 'Document not created! ' + str(e)}), 500

@main_ap.route('/documents/download', endpoint='download', methods=['GET'], strict_slashes=False)
@viewer_required
def download_doc():
    try:
        id = request.args.get('id')
        document = session.query(Document).filter_by(id=id).first()
        print('Doc name: ', document.doc_title)
        print('File id: ', id)
        document_path = document.document_path
        print("Document path:", document_path)
        
        if document:
            print("Path exists:", os.path.exists(document_path))
            if os.path.isfile(document_path):
                print("File exists. Sending for download.")
                directory = os.path.dirname(document_path)
                print(directory)
                filename = os.path.basename(document_path)
                print(filename)
                return send_from_directory(directory, filename, as_attachment=True)
            else:
                print("File not found.")
                return "Document not found", 404

        return "Document not found", 404

    except Exception as e:
        session.rollback()
        print("An error occurred while downloading the document:")
        print(e)
        return jsonify({'error': 'Documents not fetched! ' + str(e)}), 500


if __name__ == '__main__':
    app.run()
