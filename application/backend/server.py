# Route for seeing a data
import time
from flask import Flask, jsonify, request
from app import routes

app = Flask(__name__)

# Running app
if __name__ == '__main__':
    app.run(debug=True)