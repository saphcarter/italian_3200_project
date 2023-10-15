from http.server import BaseHTTPRequestHandler
import json
from backend.server import app, db
from backend.models import Quiz

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        with app.app_context():
            quizzes = Quiz.query.all()

        quiz_names = []
        for quiz in quizzes:
            quiz_details = []
            quiz_details.append(quiz.id)
            quiz_details.append(quiz.name)
            quiz_details.append(quiz.due_date)
            quiz_names.append(quiz_details)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(quiz_names).encode())
