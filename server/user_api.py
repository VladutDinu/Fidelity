from flask import Flask, send_from_directory, jsonify, request, make_response, after_this_request, Blueprint
from flask_cors import CORS, cross_origin
from sqlalchemy.orm import sessionmaker
import sys
sys.path.append('./models')
from models import *
import datetime
from flask_mail import Mail, Message
import math
from pytz import timezone
import hashlib
from threading import Thread
import random
Session = sessionmaker(bind=engine)
session = Session()

def send_async_email(app, msg, mail):
    with app.app_context():
       mail.send(msg)

def send_email(subject, sender, recipients, text_body, app, mail):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    thr = Thread(target=send_async_email, args=[app, msg, mail])
    thr.start()

user_api = Blueprint('user_api', __name__)
@user_api.route("/get_users", methods = ['GET'])
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
@user_api.route("/get_users_email", methods = ['GET'])
def get_users_email():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    query = session.query(UserRegistration.Key).filter_by(user_id=session.query(User.id).filter_by(email=request.args['email']).all()[0][0]).all()
    print(query[0][0])
    response = make_response(
                    jsonify({
                        "code": query[0][0]
                    }),
                    200,
                )
    response.headers["Content-Type"] = "application/json"
    return response



# Path for all the static files (compiled JS/CSS, etc.)
@user_api.route("/login_user", methods = ['GET'])
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

@user_api.route("/register_user", methods = ['POST'])
def register_user():
    from server import app, mail
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
            verifCode = math.floor(100000+random.randint(1,900000))
            session.add(registered_user)
            session.commit()
            id=session.query(User.id).filter_by(email=request.get_json()['email']).all()[0][0]
            verification_user = UserRegistration(     
                user_id         =id,
                Key             =str(verifCode),     
                emailsenttime   =datetime.datetime.strptime(str(datetime.datetime.now(timezone('Europe/Bucharest'))).split('.')[0],"%Y-%m-%d %H:%M:%S")
            )
            
            session.add(verification_user)
            session.commit()
            response = make_response(
                    jsonify(
                        {"message": "Successfuly registered",
                        }
                    ),
                    200,
                )
            send_email('Account verification', sender='fidelity.api@gmail.com',  recipients=['jahebiv301@87708b.com'], 
                       text_body=f"Hello,\n\nTo verify your account please introduce this code into the application {verifCode} !\n\nFidelity API team", 
                       app=app, mail=mail)
            response.headers["Content-Type"] = "application/json"
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

# Path for all the static files (compiled JS/CSS, etc.)
@user_api.route("/forgot_password", methods = ['GET'])
def forgot_password():
    from server import app, mail
    arg2= request.args['email']
    query = session.query(User.email, User.phone_number).filter_by(email=arg2).count()
   
    if(query==1):
        query = session.query(User.email, User.phone_number).filter_by(email=arg2).all()
        link='http://127.0.0.1:5002/reset_password?key='+str(hashlib.md5((query[0][0]+query[0][1]).encode('utf-8')).hexdigest())
        #send email with a md5 cached info for identifying in db
        msg = Message('Account recovery', sender='fidelity.api@gmail.com', recipients=['jahebiv301@87708b.com'])
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

@user_api.route("/reset_password", methods = ['POST'])
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

@user_api.route("/validate_user", methods = ['POST'])
def validate_user():
    email = request.args['email']
    verifCode = request.args['code']
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


