from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import json
from backend.server import app, db
from backend.models import QuizResults

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        with app.app_context():
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            print(data)

            try:

                date = data['dateCompleted']

                print(data['userId'])
                print(data['quizId'])
                print(date)
                print(data['quizName'])

                new = QuizResults(
                    userId=data['userId'], 
                    quizId=data['quizId'], 
                    dateCompleted=date,
                    quizName=data['quizName']
                )
                
                print(new)

                db.session.add(new)
                db.session.commit()

                # Sending a response
                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response_content = json.dumps({"message": "Quiz Result added successfully", "id": new.id})
                self.wfile.write(response_content.encode('utf-8'))

            except Exception as e:
                db.session.rollback()
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response_content = json.dumps({
                    "error": str(e),
                    "userId": data.get('userId', None),
                    "quizId": data.get('quizId', None),
                    "dateCompleted": data.get('dateCompleted', None),
                    "quizName": data.get('quizName', None)
                })
                self.wfile.write(response_content.encode('utf-8'))