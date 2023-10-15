import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from backend.server import app, db
from backend.models import Question

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
            with app.app_context():
                try:
                    quizId = int(self.path.split('id=')[-1])

                except (ValueError, IndexError):
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Invalid request"}).encode())
                    return

                try:
                    questions = db.session.query(Question).filter(Question.quizId == quizId).all()

                    question_details_list = []
                    for question in questions:
                        q_dict = {
                            "id": question.id,
                            "quizId": question.quizId,
                            "audio": question.audio
                        }
                        question_details_list.append(q_dict)

                    # Send the JSON response
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(question_details_list).encode())

                except Exception as e:
                    self.send_response(500)
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": str(e)}).encode())
