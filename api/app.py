from flask import Flask
from api.views import main_ap

app = Flask(__name__)
app.register_blueprint(main_ap, url_prefix='/api')