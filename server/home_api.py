from flask import Flask, send_from_directory, jsonify, request, make_response, after_this_request, Blueprint
from flask_cors import CORS, cross_origin

home_api = Blueprint('home_api', __name__)
@home_api.route("/")
def base():
    return jsonify('Hello')