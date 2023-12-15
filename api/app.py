from flask import Flask
from api.views import main_ap
from api.auth import auth_ap
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
# app.config['UPLOAD_DIRECTORY'] = 'static/uploads'
app.config['JWT_SECRET_KEY'] = 'wabaham9@gmail.com'
jwt = JWTManager(app)
app.register_blueprint(main_ap, url_prefix='/api/')
app.register_blueprint(auth_ap, url_prefix='/auth')

# @app.errorhandler(404)
# def handle_not_found_error(error):
#     error_message = {
#         'error': 'Not found',
#         'message': 'The requested resource was not found on the server.'
#     }
    
#     response = jsonify(error_message)
#     response.status_code = 404
#     response.headers['Content-Type'] = 'application/json'
    
#     return response

# @app.errorhandler(400)
# def handle_bad_request_error(error):
#     error_message = {
#         'error': 'Bad request',
#         'message': 'The server could not understand the request due to invalid syntax or missing parameters.'
#     }
    
#     response = jsonify(error_message)
#     response.status_code = 400
#     response.headers['Content-Type'] = 'application/json'
    
#     return response

# @app.errorhandler(500)
# def handle_internal_server_error(error):
#     error_message = {
#         'error': 'Internal server error',
#         'message': 'An internal server error occurred.'
#     }
    
#     response = jsonify(error_message)
#     response.status_code = 500
#     response.headers['Content-Type'] = 'application/json'
    
#     return response

# @app.errorhandler(401)
# def handle_unauthorized_error(error):
#     error_message = {
#         'error': 'Unauthorized',
#         'message': 'You are not authorized to access this resource.'
#     }
    
#     response = jsonify(error_message)
#     response.status_code = 401
#     response.headers['Content-Type'] = 'application/json'
    
#     return response

# @app.errorhandler(403)
# def handle_forbidden_error(error):
#     error_message = {
#         'error': 'Forbidden',
#         'message': 'Access to the requested resource is forbidden.'
#     }
    
#     response = jsonify(error_message)
#     response.status_code = 403
#     response.headers['Content-Type'] = 'application/json'
    
#     return response


