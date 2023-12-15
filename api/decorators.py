from functools import wraps
from flask import jsonify
from flask_jwt_extended import create_access_token, get_jwt, verify_jwt_in_request, jwt_required, get_jwt_identity

def viewer_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if current_user.get('role') in ['viewer', 'editor', 'admin']:
            return fn(*args, **kwargs)
        else:
            return jsonify(message='Not allowed to access this resource'), 403
    return wrapper

def editor_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if current_user.get('role') in ['editor', 'admin']:
            return fn(*args, **kwargs)
        else:
            return jsonify(message='Not allowed to access this resource'), 403
    return wrapper

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if current_user.get('role') in ['admin']:
            return fn(*args, **kwargs)
        else:
            return jsonify(message='Not allowed to access this resource'), 403
    return wrapper