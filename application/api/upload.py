from http.server import BaseHTTPRequestHandler
import json
import requests

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(405)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"Method Not Allowed")

    def do_POST(self):
        filename = self.path.split('filename=')[-1]
        print(f"Extracted filename: {filename}")
        file_length = int(self.headers['Content-Length'])
        file_data = self.rfile.read(file_length)

        bridge_url = "https://italian-pronunciation-app.vercel.app/api/blobBridge?filename=" + filename
        headers = {
            "Content-Type": self.headers['Content-Type']
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
