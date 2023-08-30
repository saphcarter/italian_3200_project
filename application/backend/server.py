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
    id = db.Column(db.Integer, primary_key = True)
    assigned_tasks = db.Column(db.String(50), nullable = False)
    due_dates = db.Column(db.String(200), nullable = False)

    # create a string
    def __repr__(self):
        return '<Name %r>' % self.name

@app.route('/tasks', methods=['GET', 'POST'])
def assign_tasks():
    return 'filler'
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)