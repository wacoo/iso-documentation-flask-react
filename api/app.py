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

