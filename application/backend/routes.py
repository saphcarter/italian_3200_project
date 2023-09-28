
from flask import Flask, request, jsonify
from models import User, Quiz, Question
from backend import app, db

app = Flask(__name__)

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

@app.route('/quizzes', methods=['GET'])
def get_tasks():
    quizzes = Quiz.query.all()
    quiz_list = [{"id": quizzes.id, "name": quiz.name, "due_date": quiz.due_date} for quiz in quizzes]
    return jsonify(quiz_list)


@app.route('/quizzes/addquiz', methods=['POST'])
def assign_task():
    data = request.json
    new = Quiz(id=data['id'], name=data['name'],due_date=data['due_date'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz created successfully"}), 201


@app.route('/quizzes/<int:id>', methods=['GET'])
def get_task(id):
    quiz = Quiz.query.get(id)
    if quiz:
        return jsonify({"id": quiz.id, "name": quiz.name, "due_date": quiz.due_date})
    return jsonify({"message": "Quiz not found"}), 404


@app.route('/quizzes/<int:id>', methods=['PUT'])
def update_task(id):
    quiz = Quiz.query.get(id)
    if quiz:
        data = request.json
        quiz.id = data['id']
        quiz.name = data['name']
        db.session.commit()
        return jsonify({"message": "Task updated successfully"})
    return jsonify({"message": "Task not found"}), 404


@app.route('/quizzes/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Quiz.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
    return jsonify({"message": "Task not found"}), 404


@app.route('/quizzes/addtest')
def add_test():
    new_task = Quiz(name="Quiz",due_date="1-8-2023")
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"}), 201


#    GET /questions: Retrieve a list of questions.
#    POST /questions/addquestion: Add a question.
#    GET /questions/:id: Retrieve a specific question.
#    PUT /questions/:id: Update an existing question.
#    DELETE /questions/:id: Delete a specific question.

@app.route('/questions', methods=['GET'])
def get_question():
    questions = Question.query.all()
    question_list = [{"id": questions.id, "quiz_id": questions.quiz_id, "audio": question.audio, "quiz": questions.quiz} for question in questions]
    return jsonify(question_list)


@app.route('/questions/addquestion', methods=['POST'])
def add_question():
    data = request.json
    new = Question(id = data['id'], quiz_id = data['quiz_id'], question = data['audio'], quiz = data['quiz'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Queustion added successfully"}), 201


@app.route('/questions/<int:id>', methods=['GET'])
def get_question(id):
    question = Question.query.get(id)
    if question:
        return jsonify({"id": question.id, "quiz_id": question.quiz_id, "audio": question.audio, "quiz":  question.quiz})
    return jsonify({"message": "Question not found"}), 404


@app.route('/questions/<int:id>', methods=['PUT'])
def update_question(id):
    question = Question.query.get(id)
    if question:
        data = request.json
        question.id = data['id']
        question.audio = data['audio']
        question.quiz_id = data['quiz_id']
        db.session.commit()
        return jsonify({"message": "Question updated successfully"})
    return jsonify({"message": "Question not found"}), 404


@app.route('/questions/<int:id>', methods=['DELETE'])
def delete_question(id):
    task = Question.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Question deleted successfully"})
    return jsonify({"message": "Question not found"}), 404

# Running app
if __name__ == '__main__':
    app.run(debug=True)



