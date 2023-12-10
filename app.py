import jwt
from datetime import datetime, timedelta
from bson import ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/account/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS", "DELETE"]}})

# load_dotenv()
#
# secret_key = os.environ.get('SECRET_KEY')

app.config['SECRET_KEY'] = 'secret-key'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/poghota'
mongo = PyMongo(app)
users_collection = mongo.db.users
complaints_collection = mongo.db.complaints
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
    user = users_collection.find_one({"email": email})
    user_data["_id"] = str(result.inserted_id)
    user_id = str(user.get("_id"))
    expiration = datetime.utcnow() + timedelta(days=1)
    token = jwt.encode({'id': user_id, 'exp': expiration}, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify(
        {"message": "User registered successfully", "user": user_data, "name": user["name"], "token": token}), 201


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})

    if user and check_password_hash(user['password'], password):
        user_id = str(user.get("_id"))
        expiration = datetime.utcnow() + timedelta(days=1)
        token = jwt.encode({'id': user_id, 'exp': expiration}, app.config['SECRET_KEY'], algorithm='HS256')
        # return jsonify({"message": "Login successful"}), 200
        print(f"Generated Token: {token}")
        return jsonify({"message": "Login successful", "token": token, "name": user["name"]}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route('/account/complaints', methods=['GET'])
def get_complaints():
    token = request.headers.get('Authorization')

    if not token or not token.startswith('Bearer '):
        return jsonify({"error": "Invalid token format"}), 401

    token = token.split('Bearer ')[1]

    try:
        decoded_token = jwt.decode(token, 'secret-key', algorithms=['HS256'])
        user_id = decoded_token.get('id')
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    print("Debug: User ID from Token:", user_id)

    complaints = complaints_collection.find({"user_id": user_id})
    user_complaints_list = [
        {**complaint, '_id': str(complaint['_id'])} for complaint in complaints
    ]

    if not user_complaints_list:
        print("Debug: No complaints found for the user")

    return jsonify({"complaints": user_complaints_list}), 200


@app.route('/account/complaints', methods=['POST'])
def add_complaint():
    data = request.get_json()
    title = data.get('title')
    department = data.get('department')
    location = data.get('location')
    description = data.get('description')
    files = data.get('files', [])

    token = request.headers.get('Authorization')

    if not token or not token.startswith('Bearer '):
        return jsonify({"error": "Invalid token format"}), 401

    token = token.split('Bearer ')[1]

    try:
        decoded_token = jwt.decode(token, 'secret-key', algorithms=['HS256'])
        user_id = decoded_token.get('id')
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    current_date = datetime.utcnow()

    complaint_data = {
        "title": title,
        "department": department,
        "location": location,
        "description": description,
        "user_id": user_id,
        "date_added": current_date
    }

    for file in files:
        filename = secure_filename(file.get('name'))
        file_content = file.get('content')

        if not filename or not file_content:
            return jsonify({"error": "Invalid file data"}), 400

        complaint_data.setdefault("files", []).append({
            "name": filename,
            "content": file_content
        })

    complaints_collection.insert_one(complaint_data)

    added_complaint = complaints_collection.find({"user_id": user_id})
    user_complaints_list = [
        {**complaint, '_id': str(complaint['_id'])} for complaint in added_complaint]

    return jsonify({
        "message": "Complaint added successfully",
        "complaints": user_complaints_list,
        "_id": user_id
    }), 201


@app.route('/account/complaints/delete', methods=['DELETE'])
def delete_complaint():
    data = request.get_json()
    token = request.headers.get('Authorization')
    complaint_id = data.get('complaint_id')

    token = token.split('Bearer ')[1]  # Extract the actual token part

    decoded_token = jwt.decode(token, 'secret-key', algorithms=['HS256'])
    user_id = decoded_token.get('id')

    try:
        # Convert the complaint_id to ObjectId
        object_id = ObjectId(complaint_id)
    except:
        return jsonify({"error": "Invalid complaint_id format"}), 400

    # Find the complaint with the given _id and user_id
    complaint = mongo.db.complaints.find_one({"_id": object_id, "user_id": user_id})

    if not complaint:
        return jsonify({"error": "Complaint not found or does not belong to the user"}), 404

    # Delete the complaint
    mongo.db.complaints.delete_one({"_id": object_id})
    return get_complaints()


if __name__ == '__main__':
    app.run(debug=True)
