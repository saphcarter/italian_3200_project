from flask import Flask, request, jsonify
from backend import app, db
from backend.models import Quiz


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


@app.route('/quizzes/addquiz', methods=['POST'])
def add_quiz():
    data = request.json
    new = Quiz(id=data['id'], name=data['name'],due_date=data['due_date'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz created successfully"}), 201


@app.route('/quizzes/<int:id>', methods=['GET'])
def get_quiz(id):
    quiz = Quiz.query.get(id)
    if quiz:
        return jsonify({"id": quiz.id, "name": quiz.name, "due_date": quiz.due_date})
    return jsonify({"message": "Quiz not found"}), 404


@app.route('/quizzes/<int:id>', methods=['PUT'])
def update_quiz(id):
    quiz = Quiz.query.get(id)
    if quiz:
        data = request.json
        quiz.id = data['id']
        quiz.name = data['name']
        db.session.commit()
        return jsonify({"message": "Task updated successfully"})
    return jsonify({"message": "Task not found"}), 404


@app.route('/quizzes/<int:id>', methods=['DELETE'])
def delete_quiz(id):
    task = Quiz.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
    return jsonify({"message": "Task not found"}), 404


@app.route('/quizzes/addtest')
def add_test():
    new_task = Quiz(id=0,name="Quiz",due_date="1-8-2023")
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"}), 201

@app.route('/quizzes/questions')
def questions_from_quiz(id):
    questions = Question.query.filter_by(quiz_id == id).all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quiz_id)
        q_details.append(question.audio)
        q_names.append(q_details)

    return jsonify(q_names)


#Questions routes
@app.route('/questions', methods=['GET'])
def get_all_qs():
    questions = Questions.query.all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quiz_id)
        q_details.append(question.audio)
        q_names.append(q_details)

    return jsonify(q_names)


@app.route('/questions/addquestion', methods=['POST'])
def add_question():
    data = request.json
    new = Questions(id=data['id'], audio=data['audio'],quiz_id=data['quiz_id'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Queustion added successfully"}), 201


@app.route('/questions/<int:id>', methods=['GET'])
def get_question(id):
    question = Questions.query.get(id)
    if question:
        return jsonify({"id": question.id, "audio_id": question.quiz_id, "quiz_id": question.quiz})
    return jsonify({"message": "Question not found"}), 404


@app.route('/questions/<int:id>', methods=['PUT'])
def update_question(id):
    question = Questions.query.get(id)
    if question:
        data = request.json
        question.id = data['id']
        question.audio = data['audio']
        question.quiz_id = data['quiz_id']
        db.session.commit()
        return jsonify({"message": "Question updated successfully"})
    return jsonify({"message": "Question not found"}), 404


@app.route('/questions/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Questions.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Question deleted successfully"})
    return jsonify({"message": "Question not found"}), 404

