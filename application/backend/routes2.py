from flask import Flask, request, jsonify
from server import app
import os

# Set the directory for storing uploaded files
# not sure if this should go somewhere else...
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_audio():
    uploaded_file = request.files['audioBlob']
    
    # if audio file is present
    if uploaded_file.filename != '':
        # save the file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        uploaded_file.save(file_path)

        # generate (placeholder) score
        import random
        score = random.randint(0, 100)

        # delete the file 
        os.remove(file_path)

        return jsonify({'score': score})

    return jsonify({'error': 'No file uploaded'}), 400