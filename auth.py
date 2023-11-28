from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo.errors import ConnectionFailure

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")

try:
    client.admin.command('ping')
except ConnectionFailure:
    print("Server not available")
db = client["user_auth"]
users_collection = db["users"]


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
#     name = data.get('name')
#     surname = data.get('surname')
    email = data.get('email')
#     phone_number = data.get('phone_number')
    password = data.get('password')

#     if not name or not surname or not email or not phone_number or not password:
#         return jsonify({"error": "All fields are required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email is already taken"}), 400

    hashed_password = generate_password_hash(password)

    user_data = {
#         "name": name,
#         "surname": surname,
        "email": email,
#         "phone_number": phone_number,
        "password": hashed_password
    }

    result = users_collection.insert_one(user_data)

    return jsonify({"message": "User registered successfully", "user_id": str(result.inserted_id)}), 201


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})

    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


if __name__ == '__main__':

    app.run(debug=True)
