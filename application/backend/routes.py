
from flask import Flask, request, jsonify
from models import User, Quiz, Question, QuizResults, QuestionResults
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

## Quizzes Database

# Get all Quizzes
@app.route('/quizzes')
def get_quizes():
    quizzes = Quiz.query.all()
    quiz_names = []
    for quiz in quizzes:
        quiz_details = []
        quiz_details.append(quiz.id)
        quiz_details.append(quiz.name)
        quiz_details.append(quiz.due_date)
        quiz_names.append(quiz_details)

    return jsonify(quiz_names)

# Add Quiz
@app.route('/quizzes/addquiz', methods=['POST'])
def assign_task():
    data = request.json
    new = Quiz(id=data['id'], name=data['name'],due_date=data['due_date'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz created successfully"}), 201

# Get Specific Quiz
@app.route('/quizzes/<int:id>', methods=['GET'])
def get_task(id):
    quiz = Quiz.query.get(id)
    if quiz:
        return jsonify({"id": quiz.id, "name": quiz.name, "due_date": quiz.due_date})
    return jsonify({"message": "Quiz not found"}), 404

# Update Quiz
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

# Delete Quiz
@app.route('/quizzes/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Quiz.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
    return jsonify({"message": "Task not found"}), 404

# Add Test Quiz
@app.route('/quizzes/addtest')
def add_test():
    new_task = Quiz(name="Quiz",due_date="1-8-2023")
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"}), 201

# Get All Questions for a Quiz
@app.route('/quizzes/questions')
def questions_from_quiz(id):
    questions = Question.query.filter_by(Question.quiz_id == id).all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quiz_id)
        q_details.append(question.audio)
        q_names.append(q_details)

    return jsonify(q_names)


## Questions Database

# Get all Questions
@app.route('/questions', methods=['GET'])
def get_question():
    questions = Question.query.all()
    question_list = [{"id": questions.id, "quiz_id": questions.quiz_id, "audio": question.audio, "quiz": questions.quiz} for question in questions]
    return jsonify(question_list)

# Add Question
@app.route('/questions/addquestion', methods=['POST'])
def add_question():
    data = request.json
    new = Question(id = data['id'], quiz_id = data['quiz_id'], question = data['audio'], quiz = data['quiz'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Queustion added successfully"}), 201

# Get Specific Question
@app.route('/questions/<int:id>', methods=['GET'])
def get_question(id):
    question = Question.query.get(id)
    if question:
        return jsonify({"id": question.id, "quiz_id": question.quiz_id, "audio": question.audio, "quiz":  question.quiz})
    return jsonify({"message": "Question not found"}), 404

# Update Question
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

# Delete Question
@app.route('/questions/<int:id>', methods=['DELETE'])
def delete_question(id):
    question = Question.query.get(id)
    if question:
        db.session.delete(question)
        db.session.commit()
        return jsonify({"message": "Question deleted successfully"})
    return jsonify({"message": "Question not found"}), 404

#    GET /questions: Retrieve a list of questions.
#    POST /questions/addquestion: Add a question.
#    GET /questions/:id: Retrieve a specific question.
#    PUT /questions/:id: Update an existing question.
#    DELETE /questions/:id: Delete a specific question.

## Question Results

# Get All Quiz Results
@app.route('/quiz_results')
def get_quiz_results():
    quiz_results_list = QuizResults.query.all()
    all_quiz_results = []
    for quiz_result in quiz_results_list:
        details = []
        details.append(quiz_result.id)
        details.append(quiz_result.userId)
        details.append(quiz_result.quizId)
        details.append(quiz_result.dateCompleted)
        details.append(quiz_result.user)
        all_quiz_results.append(details)
    
    return jsonify(all_quiz_results)

# Get Specific Quiz Result
@app.route('/quiz_results/<int:id>', methods=['GET'])
def get_quiz_results(id):
    quiz_result = QuizResults.query.get(id)
    if quiz_result:
        return jsonify({"id": quiz_result.id, "userId": quiz_result.userId, "quizId": quiz_result.quizId, "dateCompleted":  quiz_result.dateCompleted, "user":  quiz_result.user})
    return jsonify({"message": "Quiz Result not found"}), 404

# Add Quiz Result
@app.route('/quiz_results/addquizresult', methods=['POST'])
def add_quiz_results():
    data = request.json
    new = QuizResults(id = data['id'], userId = data['userId'], quizId = data['quizId'], dateCompleted = data['dateCompleted'], user = data['user'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz Result added successfully"}), 201

# Update Quiz Result
@app.route('/quiz_results/<int:id>', methods=['PUT'])
def update_quiz_result(id):
    quiz_result = QuizResults.query.get(id)
    if quiz_result:
        data = request.json
        quiz_result.id = data['id']
        quiz_result.userId = data['userId']
        quiz_result.quizId = data['quizId']
        quiz_result.dateCompleted = data['dateCompleted']
        quiz_result.user = data['user']
        db.session.commit()
        return jsonify({"message": "Quiz Result updated successfully"})
    return jsonify({"message": "Quiz Result not found"}), 404

# Delete Quiz Result
@app.route('/quiz_results/<int:id>', methods=['DELETE'])
def delete_quiz_result(id):
    quiz_result = QuizResults.query.get(id)
    if quiz_result:
        db.session.delete(quiz_result)
        db.session.commit()
        return jsonify({"message": "Quiz Result deleted successfully"})
    return jsonify({"message": "Quiz Result not found"}), 404

## Question Results Database

# Get All Question Results
@app.route('/question_results', methods=['GET'])
def get_all_question_results():
    question_results_list = QuestionResults.query.all()
    return jsonify(question_results_list)

# Get Specific Question Result
@app.route('/question_results/<int:id>', methods=['GET'])
def get_question_result(id):
    question_result = QuestionResults.query.get(id)
    if question_result:
        return jsonify({"id": question_result.id, "quizResultId": question_result.quizResultId, "questionId": question_result.questionId, "answerAudio":  question_result.answerAudio, "similarityScore":  question_result.similaritScore, "selfEvalScore": question_result.selfEvalScore, "quiz_result": question_result.quiz_result, "question": question_result.question})
    return jsonify({"message": "Question Result not found"}), 404

# Add Question Result
@app.route('/question_results/addquestionresult', methods=['POST'])
def add_question_results():
    data = request.json
    new = QuestionResults(id = data['id'], quizResultId = data['quizResultId'], questionId = data['questionId'], answerAudio = data['answerAudio'], similarityScore = data['similarityScore'], selfEvalScore = data['selfEvalScore'], quiz_result = data['quiz_result'], question = data['question'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Question Result added successfully"}), 201

# Update Question Result
@app.route('/question_results/<int:id>', methods=['PUT'])
def update_question_result(id):
    question_result = QuestionResults.query.get(id)
    if question_result:
        data = request.json
        question_result.id = data['id']
        question_result.quizResultId = data['quizResultId']
        question_result.questionId = data['questionId']
        question_result.answerAudio = data['answerAudio']
        question_result.similarityScore = data['similarityScore']
        question_result.selfEvalScore = data['selfEvalScore']
        question_result.quiz_result = data['quiz_result']
        question_result.question = data['question']
        db.session.commit()
        return jsonify({"message": "Question Result updated successfully"})
    return jsonify({"message": "Question Result not found"}), 404

# Delete Question Result
@app.route('/question_results/<int:id>', methods=['DELETE'])
def delete_question_result(id):
    question_result = QuestionResults.query.get(id)
    if question_result:
        db.session.delete(question_result)
        db.session.commit()
        return jsonify({"message": "Question Result deleted successfully"})
    return jsonify({"message": "Question Result not found"}), 404

# Running app
if __name__ == '__main__':
    app.run(debug=True)