from backend import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

# create database model
class Quizzes(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(64), nullable = False)
    due_date = db.Column(db.DateTime, nullable = True)

    # Establish a one-to-many relationship with questions
    questions = relationship("Question", back_populates="quizzes")

    # create a string
    def __repr__(self):
        return '<Task-Id %r>' % self.quiz_id
    
class Questions(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    quiz_id = db.Column(db.Integer, ForeignKey('quizzes.id'))
    quiz = relationship("Quiz", back_populates="questions")

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_last_seen(self):
        local_tz = pytz.timezone('Australia/Perth')
        local_dt = self.last_seen.replace(tzinfo=pytz.utc).astimezone(local_tz)
        return local_tz.normalize(local_dt)

