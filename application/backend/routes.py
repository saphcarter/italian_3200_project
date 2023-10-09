from flask import Flask, request, jsonify
from sqlalchemy.orm import joinedload
from server import app, db
from models import Quiz, Question, QuizResults, QuestionResults
import os

# get all quizzes
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

# add a quiz
@app.route('/quizzes/addquiz', methods=['POST'])
def assign_task():
    data = request.json
    new = Quiz(name=data['name'],due_date=data['due_date'])
    print("THE DUE DATE IS: " + data['due_date'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz created successfully", "id": new.id}), 201

# get a specific quiz
@app.route('/quizzes/<int:id>', methods=['GET'])
def get_task(id):
    quiz = Quiz.query.get(id)
    if quiz:
        return jsonify({"id": quiz.id, "name": quiz.name, "due_date": quiz.due_date})
    return jsonify({"message": "Quiz not found"}), 404

# delete a quiz & all associated questions
@app.route('/quizzes/<int:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    try:
        # Retrieve the quiz or return a 404 if not found
        quiz = Quiz.query.get_or_404(quiz_id)

        base_directory = os.path.dirname(os.path.abspath(__file__))
        print(f"Base directory: {base_directory}")

        # Retrieve and delete associated questions
        questions = Question.query.filter_by(quiz_id=quiz_id).all()
        for question in questions:
            
            audio_path = os.path.join(base_directory, question.audio.lstrip('/'))

            # is audio file used by any other questions
            other_questions_with_same_audio = Question.query.filter(
                Question.audio == question.audio, 
                Question.id != question.id
            ).count()

            # if no other questions use this audio file, delete it
            if not other_questions_with_same_audio and os.path.exists(audio_path):
                os.remove(audio_path)

            # delete question entry from database
            db.session.delete(question)

        db.session.delete(quiz)
        db.session.commit()

        return jsonify({"message": "Quiz deleted successfully"})

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error deleting quiz: {str(e)}"}), 500

# get all questions in a specific quiz
@app.route('/quizzes/questions/<int:id>')
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

# get all questions
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

# add a question
@app.route('/questions/addquestion', methods=['POST'])
def add_question():
    data = request.get_json()
    audio_path = data['audio']['audioPath']

    question = Question(audio=audio_path, quiz_id=data['quiz_id'])
    db.session.add(question)
    db.session.commit()
    return jsonify({"message": "Question added successfully"}), 201

# get a specific question
@app.route('/questions/<int:id>', methods=['GET'])
def get_question(id):
    question = Question.query.get(id)
    if question:
        return jsonify({"id": question.id, "quiz_id": question.quiz_id, "audio": question.audio})
    return jsonify({"message": "Question not found"}), 404

# get all quiz result entries
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

# get all quiz result entries for a specific user
@app.route('/quiz_results/user', methods=['POST'])
def get_user_results():
    data = request.json
    user_id = data.get('user_id')
    
    quiz_results_list = (QuizResults.query
                         .options(joinedload(QuizResults.quiz))
                         .filter_by(userId=user_id)
                         .all())
    
    all_quiz_results = []
    for quiz_result in quiz_results_list:
        details = [
            quiz_result.id,
            quiz_result.userId,
            quiz_result.quizId,
            quiz_result.dateCompleted,
            quiz_result.quiz.name
        ]
        all_quiz_results.append(details)
    
    return jsonify(all_quiz_results)

# get a specific quiz result
@app.route('/quiz_results/<int:id>', methods=['GET'])
def get_quiz_results(id):
    quiz_result = QuizResults.query.get(id)
    if quiz_result:
        return jsonify({"id": quiz_result.id, "userId": quiz_result.userId, "quizId": quiz_result.quizId, "dateCompleted":  quiz_result.dateCompleted,})
    return jsonify({"message": "Quiz Result not found"}), 404

# add a quiz result
@app.route('/quiz_results/addquizresult', methods=['POST'])
def add_quiz_results():
    data = request.json
    try:
        new = QuizResults(userId = data['userId'], quizId = data['quizId'], dateCompleted = data['dateCompleted'])
        db.session.add(new)
        db.session.commit()
        return jsonify({"message": "Quiz Result added successfully", "id": new.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# get all question results
@app.route('/question_results')
def get_all_question_results():
    question_results_list = QuestionResults.query.all()
    q_names = []
    for question in question_results_list:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quizResultId)
        q_details.append(question.questionNumber)
        q_details.append(question.similarityScore)
        q_details.append(question.selfEvalScore)
        q_names.append(q_details)
    return jsonify(q_names)

# get a specific question result
@app.route('/question_results/<int:id>', methods=['GET'])
def get_question_result(id):
    question_result = QuestionResults.query.get(id)
    if question_result:
        return jsonify({"id": question_result.id, "quizResultId": question_result.quizResultId, "questionId": question_result.questionId, "answerAudio":  question_result.answerAudio, "similarityScore":  question_result.similaritScore, "selfEvalScore": question_result.selfEvalScore, "quiz_result": question_result.quiz_result, "question": question_result.question})
    return jsonify({"message": "Question Result not found"}), 404

# add a question result
@app.route('/question_results/addquestionresult', methods=['POST'])
def add_question_results():
    data = request.json
    print("quizId: " + str(data['quizResultId']))
    print("questionNumber: " + str(data['questionNumber']))
    print("similarityScore: " + str(data['similarityScore']))
    print("selfEvalScore: " + str(data['selfEvaluationScore']))
    try:
        new = QuestionResults(quizResultId = data['quizResultId'], questionNumber = data['questionNumber'], similarityScore = data['similarityScore'], selfEvalScore = data['selfEvaluationScore'])
        db.session.add(new)
        db.session.commit()
        return jsonify({"message": "Question Result added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# get all question results for a specific quiz result
@app.route('/question_results/questions/<int:qr_id>', methods=['GET'])
def q_results_from_results(qr_id):
    questions = QuestionResults.query.filter(QuestionResults.quizResultId == qr_id).all()
    q_names = []
    for question in questions:
        q_details = []
        q_details.append(question.id)
        q_details.append(question.quizResultId)
        q_details.append(question.questionNumber)
        q_details.append(question.similarityScore)
        q_details.append(question.selfEvalScore)
        q_names.append(q_details)

    return jsonify(q_names)