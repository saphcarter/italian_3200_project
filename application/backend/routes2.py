from flask import Flask, request, jsonify
from server import app
import os
from audiosimilarity import compareFiles
import subprocess
import requests

# set the directory for storing uploaded files
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
app.config['QUESTIONS_FOLDER'] = 'public'
os.makedirs(app.config['QUESTIONS_FOLDER'], exist_ok=True)

# auth0 database variables
AUTH0_DOMAIN = 'dev-n5i0vsycqsv30hrk.au.auth0.com'
CLIENT_ID = 'NiDkJddX2ac2K7uxtK6Q8XwCceKpjNQ3'
CLIENT_SECRET = 'e_Q6CP0_7RMK2H6PWepWzUhieRpFgWQ2_ghk3fwtZP-8NCOYs_VFxa-jLqGh6mXM'

@app.route('/audio', methods=['POST'])
def upload_audio():

    audio_blob = request.files['audio']
    question = request.form['question']

    question_path = '../public/' + question
    print("question path: " + question_path)
    # TODO: confirm desired directories + paths
    # ... run from application?
    # ... more error handling
    
    #if audio file is present
    if audio_blob.filename != '':
        
        #save the file
        old_file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_blob.filename)
        audio_blob.save(old_file_path)

        # convert webm to wav
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], "output.wav")
        subprocess.run(['ffmpeg', '-i', old_file_path, file_path])

        # generate (placeholder) score
        score = compareFiles(file_path, question_path)

        # delete the created files
        os.remove(old_file_path)
        os.remove(file_path)

        return jsonify({'score': score})

    return jsonify({'error': 'No file uploaded'}), 400

@app.route('/upload', methods=['POST'])
def upload_question():

    if 'questionFile' not in request.files:
        # error in here
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['questionFile']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file.save('public/' + file.filename)
        audio_path = f'/{file.filename}'
        return jsonify({'audioPath': audio_path}), 200

    return jsonify({'error': 'Error uploading file'}), 500

def get_auth0_token():
    token_endpoint = f'https://{AUTH0_DOMAIN}/oauth/token'
    payload = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'audience': f'https://{AUTH0_DOMAIN}/api/v2/',
        'grant_type': 'client_credentials'
    }
    response = requests.post(token_endpoint, json=payload)
    return response.json().get('access_token')

@app.route('/get-users', methods=['GET'])
def get_users():
    # TODO: need to restrict to administrators
    
    token = get_auth0_token()

    try:
        response = requests.get(
            f'https://{AUTH0_DOMAIN}/api/v2/users',
            headers={'Authorization': f'Bearer {token}'}
        )
        return jsonify(response.json()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500