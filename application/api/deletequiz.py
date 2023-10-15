from http.server import BaseHTTPRequestHandler, HTTPServer
import os
import json
from backend.server import app, db
from backend.models import Quiz, Question
import requests

class handler(BaseHTTPRequestHandler):

    def do_DELETE(self):
        with app.app_context():
            quizId = None
            quiz = None
            blob_url = None

            try:
                quizId = int(self.path.split('id=')[-1])
                quiz = Quiz.query.get_or_404(quizId)

                # Retrieve and delete associated questions
                questions = Question.query.filter_by(quizId=quizId).all()
                for question in questions:

                    blob_url = question.audio

                    # is audio file used by any other questions
                    other_questions_with_same_audio = Question.query.filter(
                        Question.audio == question.audio, 
                        Question.id != question.id
                    ).count()

                    # if no other questions use this audio file, delete it
                    if not other_questions_with_same_audio:
                        BRIDGE_FUNCTION_URL = 'https://italian-pronunciation-app.vercel.app/api/deleteBridge?url=' + blob_url
                        response = requests.delete(BRIDGE_FUNCTION_URL)
                        if response.status_code != 200:
                            raise Exception(f"Error deleting blob: {response.text}")
                        
                    # delete question entry from database
                    db.session.delete(question)

                db.session.delete(quiz)
                db.session.commit()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Quiz deleted successfully"}).encode())

            except Exception as e:
                db.session.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                "message": f"Error deleting quiz: {str(e)}",
                "debug": {
                    "quizId": quizId,
                    "quiz": str(quiz) if quiz else "Not Available",
                    "blob_url": blob_url if blob_url else "Not Available"
                }
            }).encode())
