import os
import subprocess
import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import requests

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(405)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"Method Not Allowed")

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length'))
        post_data = self.rfile.read(content_length)
    
        file_data = post_data

        if file_data:
            filename = "uploaded_audio.webm"
            bridge_url = "https://italian-pronunciation-app.vercel.app/api/blobBridge?filename=" + filename
            headers = {
                "Content-Type": "audio/webm"
            }
            response = requests.post(bridge_url, data=file_data, headers=headers)
            
            if response.status_code == 200:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(response.content)
            else:
                error_message = f"Failed to upload {filename} to blob storage."
                self.send_response(response.status_code)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": error_message}).encode())


        else:
            self._send_response({'error': 'No file or question provided'}, status_code=400)

    def _send_response(self, data, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
