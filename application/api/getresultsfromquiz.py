from http.server import BaseHTTPRequestHandler
import json
from backend.models import QuestionResults
from backend.server import app, db

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        try:
            qr_id = int(self.path.split('id=')[-1])

            with app.app_context():
                questions = QuestionResults.query.filter(QuestionResults.quizResultId == qr_id).all()
                q_names = []
                for question in questions:
                    q_details = [
                        question.id,
                        question.quizResultId,
                        question.questionNumber,
                        float(question.similarityScore),
                        float(question.selfEvalScore)
                    ]
                    q_names.append(q_details)

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(q_names).encode('utf-8'))

        except ValueError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"400 Bad Request: Invalid or missing qr_id")
