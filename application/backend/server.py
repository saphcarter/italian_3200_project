# Route for seeing a data
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# add database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password123@localhost/tasks.db'

# initialise database
db = SQLAlchemy(app)

# create database model
class Tasks(db.Model):
    task_id = db.Column(db.Integer, primary_key = True)
    questions = db.Column(db.String(200), nullable = False)
    due_date = db.Column(db.String(20), nullable = False)

    # create a string
    def __repr__(self):
        return '<Task-Id %r>' % self.task_id

@app.route('/addtask', methods=['GET', 'POST'])
def assign_task():
    return 'filler'
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)