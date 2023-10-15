from http.server import BaseHTTPRequestHandler
import json
from backend.server import app, db
from backend.models import Quiz

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        with app.app_context():
            # get the sent data
            content_length = int(self.headers['Content-Length'])
            request_body = self.rfile.read(content_length)
            data = json.loads(request_body)

            q_name = data['name']
            q_date = data['due_date']

            new = Quiz(name=q_name, due_date=q_date)
            db.session.add(new)
            db.session.commit()
            
            # Set the response headers
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            # Create the response message
            response_message = {
                "message": "Quiz created successfully",
                "id": new.id
            }

            # Send the response
            self.wfile.write(json.dumps(response_message).encode('utf-8'))
