import requests
from http.server import BaseHTTPRequestHandler
from flask import jsonify
import json

# auth0 database variables
AUTH0_DOMAIN = 'dev-n5i0vsycqsv30hrk.au.auth0.com'
CLIENT_ID = 'NiDkJddX2ac2K7uxtK6Q8XwCceKpjNQ3'
CLIENT_SECRET = 'e_Q6CP0_7RMK2H6PWepWzUhieRpFgWQ2_ghk3fwtZP-8NCOYs_VFxa-jLqGh6mXM'
GRANT_TYPE = 'client_credentials'
AUDIENCE = f'https://{AUTH0_DOMAIN}/api/v2/'

class handler(BaseHTTPRequestHandler):

    def get_management_api_token(self):
        payload = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'audience': AUDIENCE,
            'grant_type': GRANT_TYPE
        }
        
        url = f'https://{AUTH0_DOMAIN}/oauth/token'
        response = requests.post(url, json=payload)
        data = response.json()
        return data.get('access_token')

    def get_all_users(self, token):
        headers = {
            'Authorization': f'Bearer {token}'
        }
        url = f'https://{AUTH0_DOMAIN}/api/v2/users'
        response = requests.get(url, headers=headers)
        return response.json()

    def delete_user(self, token, user_id):
        headers = {
            'Authorization': f'Bearer {token}'
        }
        url = f'https://{AUTH0_DOMAIN}/api/v2/users/{user_id}'
        response = requests.delete(url, headers=headers)
        if response.status_code != 204:
            print(f"Failed to delete user {user_id}. Status Code: {response.status_code}. Reason: {response.text}")
    
    def do_DELETE(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length > 0:
            body = self.rfile.read(content_length)
            payload = json.loads(body.decode('utf-8'))
            current_user_id = payload.get('user_id')
            isAdmin = payload.get('isAdmin', False)
            
            if not current_user_id:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"message": "User ID not provided in the payload."}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
            
            if not isAdmin:
                print("wrong permissions")
                self.send_response(403)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b"Action not allowed")
                return

            token = self.get_management_api_token()
            users = self.get_all_users(token)

            for user in users:
                user_id = user['user_id']
                if user_id != current_user_id:
                    self.delete_user(token, user_id)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {"message": "Deletion process completed."}
            self.wfile.write(json.dumps(response).encode('utf-8'))

        else:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {"message": "No payload provided."}
            self.wfile.write(json.dumps(response).encode('utf-8'))