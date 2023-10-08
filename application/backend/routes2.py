from flask import Flask, request, jsonify
from server import app
import os
from audiosimilarity import compareFiles
import subprocess

# Set the directory for storing uploaded files
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
app.config['QUESTIONS_FOLDER'] = 'questions'
os.makedirs(app.config['QUESTIONS_FOLDER'], exist_ok=True)

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
        file.save('questions/' + file.filename)
        audio_path = f'/questions/{file.filename}'
        return jsonify({'audioPath': audio_path}), 200

    return jsonify({'error': 'Error uploading file'}), 500