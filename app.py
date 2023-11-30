#import logging
import jwt
from datetime import datetime, timedelta
from bson import ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
# from pymongo.errors import ConnectionFailure

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/complaints": {"origins": "*", "methods": ["GET", "POST"]}})
client = MongoClient("mongodb://localhost:27017/")

# try:
#     client.admin.command('ping')
# except ConnectionFailure:
#     print("Server not available")
db = client["poghota"]
users_collection = db["users"]
complaints_collection = db["complaints"]


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get('name')
    surname = data.get('surname')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    if not name or not surname or not email or not phone_number or not password:
        return jsonify({"error": "All fields are required!"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email is already taken"}), 400

    hashed_password = generate_password_hash(password)

    user_data = {
        "name": name,
        "surname": surname,
        "email": email,
        "phone_number": phone_number,
        "password": hashed_password
    }

    result = users_collection.insert_one(user_data)

    # return jsonify({"message": "User registered successfully", "user_id": str(result.inserted_id)}), 201
    user_data["_id"] = str(result.inserted_id)
    return jsonify({"message": "User registered successfully", "user": user_data}), 201

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})

    if user and check_password_hash(user['password'], password):
        expiration = datetime.utcnow() + timedelta(days=1)
        # needs to be changed later
        token = jwt.encode({'email': email, 'exp': expiration}, 'secret-key', algorithm='HS256')
        # return jsonify({"message": "Login successful"}), 200
        # print(f"Generated Token: {token}")
        return jsonify({"message": "Login successful", "token": token, "name": user["name"]}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route('/complaints', methods=['POST'])
def add_complaint():

    # complaints_collection = db["complaints"]
    #
    # if "complaints" not in db.list_collection_names():
    #     db.create_collection("complaints")

    data = request.get_json()
    title = data.get('title')
    department = data.get('department')
    location = data.get('location')
    description = data.get('description')

    complaint_data = {
        "title": title,
        "department": department,
        "location": location,
        "description": description
    }

    result = complaints_collection.insert_one(complaint_data)
    # return jsonify({"message": "Complaint added successfully", "complaint_id": str(result.inserted_id)}), 201
    added_complaint = complaints_collection.find_one({"_id": result.inserted_id}, {"_id": 0})

    return jsonify({
        "message": "Complaint added successfully",
        "complaint_id": str(result.inserted_id),
        "complaint_data": added_complaint
    }), 201


if __name__ == '__main__':
    app.run(debug=True)
