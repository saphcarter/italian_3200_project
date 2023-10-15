from http.server import BaseHTTPRequestHandler
import json
from backend.server import app, db
from backend.models import Question

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        with app.app_context():
            # get the sent data
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            quizId = data['quizId']
            blob_url = data['blob_url']

            question = Question(audio=blob_url, quizId=quizId)
            db.session.add(question)
            db.session.commit()
            
            # set the response headers
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            # create the response message
            response_message = {
                "message": "Question created successfully",
                "quizId": quizId,
                "blob_url": blob_url
            }

            # send the response
            self.wfile.write(json.dumps(response_message).encode('utf-8'))
