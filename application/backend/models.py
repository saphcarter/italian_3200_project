from backend.server import db
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, DateTime, DECIMAL, Text, ForeignKey

# create database model
class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = Column(Integer, primary_key = True, autoincrement = True)
    name = Column(String(64), nullable = False)
    due_date = Column(String(25), nullable = True)

    def __repr__(self):
        return '<Quiz-Id %r>' % self.id
   
class Question(db.Model):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key = True, autoincrement = True)
    audio = Column(String(500))
    quizId = Column(Integer, ForeignKey('quizzes.id'))
    quiz = relationship("Quiz", backref='questions')
    def __repr__(self):
        return '<Question-Id %r>' % self.id
       

# Define a QuizResults model
class QuizResults(db.Model):
    __tablename__ = 'quiz_results'

    id = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(String(60))
    quizId = Column(Integer, ForeignKey('quizzes.id'))
    dateCompleted = Column(String(25), nullable = True)
    quizName = Column(String(64), nullable = False)
    quiz = relationship("Quiz", backref='quiz_results')

    def __repr__(self):
        return '<Quiz-Result-Id %r>' % self.id

class QuestionResults(db.Model):
    __tablename__ = 'question_results'

    id = Column(Integer, primary_key=True, autoincrement=True)
    quizResultId = Column(Integer, ForeignKey('quiz_results.id'))
    questionNumber = Column(Integer)
    similarityScore = Column(DECIMAL(5, 2))
    selfEvalScore = Column(DECIMAL(5, 2))
    quiz_result = relationship("QuizResults", backref="question_results")

    def __repr__(self):
        return '<Question-Result-Id %r>' % self.id


