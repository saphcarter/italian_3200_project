from backend.models import Quiz, Question, QuizResults, QuestionResults
from http.server import BaseHTTPRequestHandler
from backend.server import app, db
import json
import requests

class handler(BaseHTTPRequestHandler):

    def do_DELETE(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        body_data = json.loads(body)
        isAdmin = body_data.get('isAdmin', False)

        if not isAdmin:
            print("wrong permissions")
            self.send_response(403)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"Action not allowed")
            return

        with app.app_context():
            try:
                print("trying delete...")

                QuestionResults.query.delete()
                QuizResults.query.delete()
                
                questions = Question.query.all()
                for question in questions:
                    blob_url = question.audio
                    BRIDGE_FUNCTION_URL = 'https://italian-pronunciation-app.vercel.app/api/deleteBridge?url=' + blob_url
                    response = requests.delete(BRIDGE_FUNCTION_URL)
                    # if it errors, it will only error if blob has already been deleted, no other error possible
                    db.session.delete(question)

                Quiz.query.delete()
                db.session.commit()

                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b"All entries in all tables have been deleted successfully")

            except Exception as e:
                db.session.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b"An error occurred: " + str(e).encode()) 