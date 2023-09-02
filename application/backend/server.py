# Route for seeing a data
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

# create database model
class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key = True)
    questions = db.Column(db.String(200), nullable = False)
    audio_paths = db.Column(db.String(200), nullable = False)
    due_date = db.Column(db.String(20), nullable = False)

    # create a string
    def __repr__(self):
        return '<Task-Id %r>' % self.task_id

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    task_list = [{"id": tasks.task_id, "questions": task.questions, "audio_paths": task.audio_path, "due_date": task.due_date} for task in tasks]
    return jsonify(task_list)


@app.route('/tasks/addtask', methods=['POST'])
def assign_task():
    data = request.json
    new_task = Task(task_id=data['task_id'], questions=data['questions'],audio_paths=data['audio_paths'],due_date=data['due_date'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"}), 201


@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get(task_id)
    if task:
        return jsonify({"id": tasks.task_id, "questions": task.questions, "audio_paths": task.audio_path, "due_date": task.due_date})
    return jsonify({"message": "Task not found"}), 404


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if task:
        data = request.json
        task.task_id = data['task_id']
        task.questions = data['questions']
        db.session.commit()
        return jsonify({"message": "Task updated successfully"})
    return jsonify({"message": "User not found"}), 404


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(user_id):
    task = Task.query.get(task_id)
    if user:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"})
    return jsonify({"message": "User not found"}), 404


@app.route('/tasks/addtest')
def add_test():
    new_task = Task(task_id=1, questions="test",audio_paths="test2",due_date="1-8-2023")
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"}), 201

 

# Running app
if __name__ == '__main__':
    app.run(debug=True)