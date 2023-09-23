from server import db
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, DateTime, DECIMAL, Text, ForeignKey
from werkzeug.security import generate_password_hash, check_password_hash

# create database model
class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = Column(Integer, primary_key = True, autoincrement = True)
    name = Column(String(64), nullable = False)
    due_date = Column(DateTime, nullable = True)

    def __repr__(self):
        return '<Quiz-Id %r>' % self.id
    
class Question(db.Model):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key = True, autoincrement = True)
    audio = Column(String(500))
    quiz_id = Column(Integer, ForeignKey('quizzes.id'))
    quiz = relationship("Quiz", back_populates="questions")

    def __repr__(self):
        return '<Question-Id %r>' % self.id

# Define a QuizResults model
class QuizResults(db.Model):
    __tablename__ = 'quiz_results'

    id = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(String(255), ForeignKey('Users.id'))
    quizId = Column(String(255), ForeignKey('Quizzes.id'))
    dateCompleted = Column(DateTime)
    user = relationship("User", back_populates="user")

    def __repr__(self):
        return '<Quiz-Result-Id %r>' % self.id

class QuestionResults(db.Model):
    __tablename__ = 'question_results'

    id = Column(Integer, primary_key=True, autoincrement=True)
    quizResultId = Column(Integer, ForeignKey('quiz_results.id'))
    questionId = Column(Integer, ForeignKey('questions.id'))
    answerAudio = Column(String(500))
    similarityScore = Column(DECIMAL(5, 2))
    selfEvalScore = Column(DECIMAL(5, 2))
    quiz_result = relationship("QuizResults", back_populates="question_results")
    question = relationship("Question", back_populates="question_results")

    def __repr__(self):
        return '<Question-Result-Id %r>' % self.id

# Need to set this up properly with auth0
class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    last_seen = Column(DateTime, default=datetime.utcnow)

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

