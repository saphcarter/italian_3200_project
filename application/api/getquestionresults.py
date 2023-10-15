from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from backend.server import app, db
from backend.models import QuestionResults

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        with app.app_context():
            qrid = int(self.path.split('qrid=')[-1])
            
            try:
                questions = QuestionResults.query.filter(QuestionResults.quizResultId == qrid).all()

                print(questions)
                    
                question_details_list = []
                for question in questions:
                    q_details = {
                        "id": question.id,
                        "quizResultId": question.quizResultId,
                        "questionNumber": question.questionNumber,
                        "similarityScore": float(question.similarityScore),
                        "selfEvalScore": float(question.selfEvalScore)
                    }
                    question_details_list.append(q_details)

                print(question_details_list)
                    
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(question_details_list).encode())
            
            except Exception as e:
                print(f"Error: {e}")
                self.send_response(500)
                self.end_headers()