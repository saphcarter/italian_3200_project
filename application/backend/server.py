import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# because this file is called server.py, when using flask tutorials you 
# may have to replace the word app with server when making calls in terminal

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

if os.getenv('DATABASE_URL'):
        app.config['SQLALCHEMY_DATABASE_URI'] =\
        os.getenv('DATABASE_URL').replace("postgres://", "postgresql://", 1)
else:     
        app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')

db = SQLAlchemy(app)
migrate = Migrate(app, db)