import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# because this file is called server.py, when using flask tutorials you 
# may have to replace the word app with server when making calls in terminal

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from backend import routes, models

# create database model
class Quizzes(db.Model):
    quiz_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64), nullable = False)
    due_date = db.Column(db.String(30), nullable = False)

    # create a string
    def __repr__(self):
        return '<Task-Id %r>' % self.quiz_id

@app.route('/quizzes', methods=['GET'])
def get_tasks():
    quizzes = Quizzes.query.all()
    quiz_list = [{"id": quizzes.quiz_id, "name": quiz.name, "due_date": quiz.due_date} for quiz in quizzes]
    return jsonify(quiz_list)


@app.route('/quizzes/addquiz', methods=['POST'])
def assign_task():
    data = request.json
    new = Quizzes(quiz_id=data['quiz_id'], name=data['name'],due_date=data['due_date'])
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Quiz created successfully"}), 201


@app.route('/quizzes/<int:quiz_id>', methods=['GET'])
def get_task(quiz_id):
    quiz = Quizzes.query.get(quiz_id)
    if quiz:
        return jsonify({"id": quiz.quiz_id, "name": quiz.name, "due_date": quiz.due_date})
    return jsonify({"message": "Quiz not found"}), 404


@app.route('/quizzes/<int:quiz_id>', methods=['PUT'])
def update_task(quiz_id):
    task = Quizzes.query.get(quiz_id)
    if task:
        data = request.json
        task.quiz_id = data['quiz_id']
        task.questions = data['questions']
        db.session.commit()
        return jsonify({"message": "Task updated successfully"})
    return jsonify({"message": "Task not found"}), 404


@app.route('/quizzes/<int:quiz_id>', methods=['DELETE'])
def delete_task(quiz_id):
    task = Quizzes.query.get(quiz_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
    return jsonify({"message": "Task not found"}), 404


@app.route('/quizzes/addtest')
def add_test():
    new_task = Quizzes(quiz_id=1, questions="test",audio_paths="test2",due_date="1-8-2023")
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"}), 201

 

# Running app
if __name__ == '__main__':
    app.run(debug=True)