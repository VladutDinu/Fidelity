from flask import Flask, send_from_directory, jsonify, request, make_response, after_this_request
from flask_cors import CORS, cross_origin
from flask_restful import Api
import random
from sqlalchemy.orm import sessionmaker
import sys
import datetime
from flask_mail import Mail, Message
import math
from pytz import timezone
import hashlib

sys.path.append('./models')
from home_api import home_api
from user_api import user_api

from models import *
app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
Session = sessionmaker(bind=engine)
session = Session()

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'fidelity.api'
app.config['MAIL_PASSWORD'] = 'Fidelity123@'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail= Mail(app)

app.register_blueprint(home_api)
app.register_blueprint(user_api)

if __name__ == "__main__":
    app.run(debug=True, port=5002)

    #https://cabreraalex.medium.com/svelte-js-flask-combining-svelte-with-a-simple-backend-server-d1bc46190ab9