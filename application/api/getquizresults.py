from http.server import BaseHTTPRequestHandler
import json
from backend.server import app, db
from backend.models import QuizResults
from sqlalchemy.orm import joinedload

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        with app.app_context():
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            user_id = data.get('user_id')
            if not user_id:
                self._send_response(400, {"error": "user_id not provided"})
                return
            
            try:
                quiz_results_list = (QuizResults.query
                                    .options(joinedload(QuizResults.quiz))
                                    .filter_by(userId=user_id)
                                    .all())
                
                all_quiz_results = []

                for quiz_result in quiz_results_list:
                    details = {
                        'id': quiz_result.id,
                        'userId': quiz_result.userId,
                        'quizId': quiz_result.quizId,
                        'dateCompleted': quiz_result.dateCompleted,
                        'quizName': quiz_result.quizName
                    }
                    all_quiz_results.append(details)
                
                self._send_response(200, all_quiz_results)

            except Exception as e:
                self._send_response(500, {"error": f"An error occurred: {str(e)}"})

    def _send_response(self, code, body):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(body).encode('utf-8'))

