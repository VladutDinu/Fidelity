from flask import Flask, send_from_directory, jsonify, request, make_response, after_this_request
from flask_cors import CORS, cross_origin
import random
from sqlalchemy.orm import sessionmaker
import sys
import datetime
from flask_mail import Mail, Message


sys.path.append('./models')
import hashlib
from models import *
app = Flask(__name__)
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
                            {"message": "Error on login",
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
            date=request.get_json()['date_of_birth'].split('-')
            new_date=datetime.date(int(date[2]), int(date[1]), int(date[0]))
            APIKEY=hashlib.md5((request.get_json()['email']+request.get_json()['phone_number']).encode('utf-8'))
            final_key='BASIC_'+str(APIKEY.hexdigest())
            registered_user = User(
                full_name=request.get_json()['full_name'], 
                username=request.get_json()['username'], 
                password=request.get_json()['password'],
                email=request.get_json()['email'], 
                phone_number=request.get_json()['phone_number'], 
                date_of_birth=new_date,
                Key=final_key
            )
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

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/forgot_password", methods = ['GET'])
def forgot_password():
    arg2= request.args['email']
    query = session.query(User.email, User.phone_number).filter_by(email=arg2).count()
   
    if(query==1):
        query = session.query(User.email, User.phone_number).filter_by(email=arg2).all()
        link='http://127.0.0.1:5002/reset_password?key='+str(hashlib.md5((query[0][0]+query[0][1]).encode('utf-8')).hexdigest())
        #send email with a md5 cached info for identifying in db
        msg = Message('Account recovery', sender='fidelity.api@gmail.com', recipients=['cirahog546@ffuqzt.com'])
        msg.body = (f"Hello,\n\nTo reset your password please access this link {link} !\n\nFidelity API team")
        mail.send(msg)
        response = make_response(
                        jsonify(
                            {"message": "Email has been sent successfuly",
                             "data": str(arg2)
                            }
                        ),
                        200,
                    )
        response.headers["Content-Type"] = "application/json"
        return response
    elif(query==0):
        response = make_response(
                        jsonify(
                            {"message": "Email doesnt exist",
                             "data": str(arg2)
                            }
                        ),
                        400,
                    )
        response.headers["Content-Type"] = "application/json"
        return response

@app.route("/reset_password", methods = ['POST'])
def reset_password():
    arg2 = request.args['key']
    query = session.query(User.email, User.phone_number).filter_by(Key='BASIC_'+arg2).count()
    if(query==1):
        query = session.query(User).filter_by(Key='BASIC_'+arg2)
        query[0].password = request.get_json()['password']
        session.merge(query[0])
        session.commit()
        response = make_response(
                        jsonify(
                            {"message": "Password has been successfuly changed",
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
                            {"message": "Couldnt find data in db",
                             "data": str(arg2)
                            }
                        ),
                        400,
                    )
        response.headers["Content-Type"] = "application/json"
        return response



if __name__ == "__main__":
    app.run(debug=True, port=5002)

    #https://cabreraalex.medium.com/svelte-js-flask-combining-svelte-with-a-simple-backend-server-d1bc46190ab9