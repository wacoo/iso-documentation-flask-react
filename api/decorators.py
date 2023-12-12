from functools import wraps
from flask import jsonify
from flask_jwt_extended import create_access_token, get_jwt, verify_jwt_in_request

def admin_required(fn):
    @wraps(fn)
    def decorator(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims.get('is_admin'):
            return fn(*args, **kwargs)
        else:
            return jsonify(msg='Admin only!'), 403
    return decorator