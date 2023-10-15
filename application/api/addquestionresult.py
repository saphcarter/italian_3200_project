from http.server import BaseHTTPRequestHandler
from backend.server import app, db
from backend.models import QuestionResults
import json

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        # Run this within the Flask app context
        with app.app_context():
            # Parse the incoming JSON data
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            print(data)

            try:
                # Perform the database operations
                new = QuestionResults(
                    quizResultId = data['quizResultId'],
                    questionNumber = data['questionNumber'],
                    similarityScore = data['similarityScore'],
                    selfEvalScore = data['selfEvaluationScore']
                )
                db.session.add(new)
                db.session.commit()
                
                # Send a successful response
                self.send_response(201)  # HTTP status code: Created
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Question Result added successfully"}).encode())
                
            except Exception as e:
                # Handle errors and send a response with an error status code
                db.session.rollback()

                self.send_response(400)  # HTTP status code: Bad Request
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": str(e),
                    "quizResultId": data.get('quizResultId', None),
                    "questionNumber": data.get('questionNumber', None),
                    "similarityScore": data.get('similarityScore', None),
                    "selfEvaluationScore": data.get('selfEvaluationScore', None)
                }).encode())