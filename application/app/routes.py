from flask import render_template, request, jsonify
from datetime import datetime
from app import app
from flask import redirect


@app.route('/')
@app.route('/index/')
def index():
    #return render_template('index.html')
    return render_template('login.html')

@app.route('/login/', methods=['GET', 'POST'])
def login():
    #if current_user.is_authenticated:
        #return redirect(url_for('index'))

    #form = LoginForm()
    #if form.validate_on_submit():
        #user = User.query.filter_by(username=form.username.data).first()
        #if user is None or not user.check_password(form.password.data):
            #flash('Invalid username or password')
            #return redirect(url_for('login'))
        #login_user(user, remember=form.remember_me.data)
        #return redirect(url_for('index'))

    return render_template('login.html')

#@app.route('/register/', methods=['GET', 'POST'])


#if you want to test out pages, just add this then navigate to localhost:5000/<page_name>
#app.route('/<page_name>/')
#def page:
#    return render_template('<page_name>.html')

