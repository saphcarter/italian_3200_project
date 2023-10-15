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

# METHOD 1:

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

    def do_GET(self):
        print("getting token...")
        token = self.get_management_api_token()
        print("getting users...")
        users = self.get_all_users(token)
        print(users)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(users).encode('utf-8'))