from flask import Flask, request, jsonify
from models import User
from app import app, db

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
    return jsonify(user_list)

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"id": user.id, "username": user.username, "email": user.email})
    return jsonify({"message": "User not found"}), 404

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])  
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user:
        data = request.json
        user.username = data['username']
        user.email = data['email']
        db.session.commit()
        return jsonify({"message": "User updated successfully"})
    return jsonify({"message": "User not found"}), 404

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"})
    return jsonify({"message": "User not found"}), 404

#    GET /api/users: Retrieve a list of all users.
#    GET /api/users/:id: Retrieve a specific user by ID.
#    POST /api/users: Create a new user.
#    PUT /api/users/:id: Update an existing user by ID.
#    DELETE /api/users/:id: Delete a user by ID.