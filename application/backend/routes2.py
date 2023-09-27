from flask import Flask, request, jsonify
from server import app
import os
from audiosimilarity import compareFiles
import subprocess

# Set the directory for storing uploaded files
# not sure if this should go somewhere else...
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/audio', methods=['POST'])
def upload_audio():

    audio_blob = request.files['audio']
    question = request.form['question']

    question_path = '../public/' + question
    print("question path: " + question_path)
    # TODO: confirm desired directories + paths
    
    #if audio file is present
    if audio_blob.filename != '':
        
        #save the file
        old_file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_blob.filename)
        audio_blob.save(old_file_path)

        # convert webm to wav
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], "output.wav")
        subprocess.run(['ffmpeg', '-i', old_file_path, file_path])

        # generate (placeholder) score
        #import random
        #score = random.randint(0, 100)
        score = compareFiles(file_path, question_path)

        # delete the created files
        os.remove(old_file_path)
        os.remove(file_path)

        return jsonify({'score': score})

    return jsonify({'error': 'No file uploaded'}), 400