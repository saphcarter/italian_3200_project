from flask import Flask, request, jsonify
from server import app
import os
from audiosimilarity import compareFiles
import wave
import io

# Set the directory for storing uploaded files
# not sure if this should go somewhere else...
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/audio', methods=['POST'])
def upload_audio():

    audio_blob = request.files['audio']
    answer_file = 'filler.wav'
    
    #if audio file is present
    if audio_blob.filename != '':
        
        #save the file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_blob.filename)
        audio_blob.save(file_path)

        # generate (placeholder) score
        import random
        score = random.randint(0, 100)
        # score = compareFiles(file_path, answer_file)

        # delete the file 
        # os.remove(file_path)

        return jsonify({'score': score})

    return jsonify({'error': 'No file uploaded'}), 400