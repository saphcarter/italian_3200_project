from flask import Flask, request, jsonify
from server import app, db
from models import Quiz, Question, QuizResults, QuestionResults
import os

## Quizzes Database
@app.route('/quizzes')
def get_quizzes():    
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
    new = Quiz(name=data['name'],due_date=data['due_date'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz created successfully", "id": new.id}), 201

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
        quiz.name = data['name']
        quiz.due_date = date['due_date']
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
    questions = Question.query.filter(Question.quiz_id == id).all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quiz_id)
        q_details.append(question.audio)
        q_names.append(q_details)

    return jsonify(q_names)

#Get All Questions for quiz 0
@app.route('/quizzes/questionstest')
def questions_from_quiz_test():
    questions = Question.query.filter(Question.quiz_id == 0).all()
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
def get_all_questions():
    questions = Question.query.all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quiz_id)
        q_details.append(question.audio)
        q_names.append(q_details)

    return jsonify(q_names)

#add a question
@app.route('/questions/addquestion', methods=['POST'])
def add_question():
    data = request.get_json()
    audio_path = data['audio']['audioPath']

    question = Question(audio=audio_path, quiz_id=data['quiz_id'])
    db.session.add(question)
    db.session.commit()
    return jsonify({"message": "Question added successfully"}), 201

# Get Specific Question
@app.route('/questions/<int:id>', methods=['GET'])
def get_question(id):
    question = Question.query.get(id)
    if question:
        return jsonify({"id": question.id, "quiz_id": question.quiz_id, "audio": question.audio})
    return jsonify({"message": "Question not found"}), 404

# Update Question
@app.route('/questions/<int:id>', methods=['PUT'])
def update_question(id):
    question = Question.query.get(id)
    if question:
        data = request.json
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

#Add Test Question
@app.route('/questions/addtest')
def add_q_test():
    quiz = Quiz.query.first()
    new_q = Question(quiz_id=quiz.id,audio="testpath")
    db.session.add(new_q)
    db.session.commit()
    return jsonify({"message": "Question created successfully"}), 201

#    GET /questions: Retrieve a list of questions.
#    POST /questions/addquestion: Add a question.
#    GET /questions/:id: Retrieve a specific question.
#    PUT /questions/:id: Update an existing question.
#    DELETE /questions/:id: Delete a specific question.

## Question Results

# Get All Quiz Results
@app.route('/quiz_results')
def get_all_results():
    quiz_results_list = QuizResults.query.all()
    all_quiz_results = []
    for quiz_result in quiz_results_list:
        details = []
        details.append(quiz_result.id)
        details.append(quiz_result.userId)
        details.append(quiz_result.quizId)
        details.append(quiz_result.dateCompleted)
        all_quiz_results.append(details)
    
    return jsonify(all_quiz_results)

# Get Specific Quiz Result
@app.route('/quiz_results/<int:id>', methods=['GET'])
def get_quiz_results(id):
    quiz_result = QuizResults.query.get(id)
    if quiz_result:
        return jsonify({"id": quiz_result.id, "userId": quiz_result.userId, "quizId": quiz_result.quizId, "dateCompleted":  quiz_result.dateCompleted,})
    return jsonify({"message": "Quiz Result not found"}), 404

# Add Quiz Result
@app.route('/quiz_results/addquizresult', methods=['POST'])
def add_quiz_results():
    data = request.json
    new = QuizResults(userId = data['userId'], quizId = data['quizId'], dateCompleted = data['dateCompleted'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz Result added successfully"}), 201

# Update Quiz Result
@app.route('/quiz_results/<int:id>', methods=['PUT'])
def update_quiz_result(id):
    quiz_result = QuizResults.query.get(id)
    if quiz_result:
        data = request.json
        quiz_result.userId = data['userId']
        quiz_result.quizId = data['quizId']
        quiz_result.dateCompleted = data['dateCompleted']
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

#Add Test Quiz result
@app.route('/quiz_results/addtest')
def add_result_test():
    quiz = Quiz.query.first()
    new_r = QuizResults(userId="testuser",quizId=quiz.id,dateCompleted="17-10-23")
    db.session.add(new_r)
    db.session.commit()
    return jsonify({"message": "Question created successfully"}), 201


## Question Results Database

# Get All Question Results
@app.route('/question_results')
def get_all_question_results():
    question_results_list = QuestionResults.query.all()
    q_names = []
    for question in question_results_list:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quizResultId)
        q_details.append(question.questionId)
        q_details.append(question.answerAudio)
        q_details.append(question.similarityScore)
        q_details.append(question.selfEvalScore)
        q_names.append(q_details)
    return jsonify(q_names)

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
    new = QuestionResults(quizResultId = data['quizResultId'], questionId = data['questionId'], similarityScore = data['similarityScore'], selfEvalScore = data['selfEvalScore'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Question Result added successfully"}), 201

# Update Question Result
@app.route('/question_results/<int:id>', methods=['PUT'])
def update_question_result(id):
    question_result = QuestionResults.query.get(id)
    if question_result:
        data = request.json
        question_result.quizResultId = data['quizResultId']
        question_result.questionId = data['questionId']
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


#Add Test Quiz result
@app.route('/question_results/addtest')
def add_question_result_test():
    quiz_res = QuizResults.query.first()
    question = Question.query.first()
    new_r = QuestionResults(quizResultId=quiz_res.id,questionId=question.id,similarityScore=3,selfEvalScore=4)
    db.session.add(new_r)
    db.session.commit()
    return jsonify({"message": "Question created successfully"}), 201

# Get All QuestionResults for a QuizResults
@app.route('/question_results/questions')
def q_results_from_results(id):
    questions = QuestionResults.query.filter(QuestionResults.quizResultId == id).all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quizResultId)
        q_details.append(question.questionId)
        q_details.append(question.similarityScore)
        q_details.append(question.selfEvalScore)
        q_names.append(q_details)

    return jsonify(q_names)

@app.route('/question_results/questions/test')
def q_results_from_results_test():
    questions = QuestionResults.query.filter(QuestionResults.quizResultId == 0).all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quizResultId)
        q_details.append(question.questionId)
        q_details.append(question.similarityScore)
        q_details.append(question.selfEvalScore)
        q_names.append(q_details)

    return jsonify(q_names)

