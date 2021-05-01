from flask import Flask, send_from_directory, jsonify, request, make_response, after_this_request
from flask_cors import CORS, cross_origin
import random
from sqlalchemy.orm import sessionmaker
import sys
sys.path.append('./models')

from models import *
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
Session = sessionmaker(bind=engine)
session = Session()


# Path for our main Svelte page
@app.route("/")
@cross_origin()
def base():
    return jsonify('Hello')

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/get_users", methods = ['GET'])
def get_users():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    users=[]
    for username, email, password in session.query(User.username, User.email, User.password):
        users.append({
            "username": username,
            "email":    email,
            "password": password
            }
        )
    response = make_response(
                    jsonify(
                        users
                    ),
                    200,
                )
    response.headers["Content-Type"] = "application/json"
    return response

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/login_user", methods = ['GET'])
def login_user():
    arg2= request.args['email']
    query = session.query(User.email).filter_by(email=arg2).count()
    if(query==1):
        response = make_response(
                        jsonify(
                            {"message": "Logged in",
                             "data": str(arg2)
                            }
                        ),
                        200,
                    )
        response.headers["Content-Type"] = "application/json"
        return response
    else:
        response = make_response(
                        jsonify(
                            {"message": "Logged in",
                             "data": str(arg2)
                            }
                        ),
                        400,
                    )
        response.headers["Content-Type"] = "application/json"
        return response

@app.route("/register_user", methods = ['POST'])
def register_user():
    """Register"""
    if not request.is_json:
        response = make_response(
                jsonify(
                    {"message": "Wrong json format"}
                ),
                418,
            )
        return response
    else:
        registered_user = User(username=request.get_json()['username'], password=request.get_json()['password'], email=request.get_json()['email'])
        query = session.query(User.email).filter_by(email=request.get_json()['email']).count()
        if(query >= 1):
            response = make_response(
                jsonify(
                    {"message": "EMAIL ALREADY USED"}
                ),
                406,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            session.add(registered_user)
            session.commit()
            response = make_response(
                    jsonify(
                        {"message": "Successfuly registered"}
                    ),
                    200,
                )
            response.headers["Content-Type"] = "application/json"
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

if __name__ == "__main__":
    app.run(debug=True, port=5002)

    #https://cabreraalex.medium.com/svelte-js-flask-combining-svelte-with-a-simple-backend-server-d1bc46190ab9