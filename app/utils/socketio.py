from flask_socketio import SocketIO, emit, send
import os
from app.models import db, User

from threading import Timer

#arguments:
#how long to wait (in seconds),
#what function to call,
#what gets passed in



# configure cors_allowed_origins
# if os.environ.get('FLASK_ENV') == 'production':
#     origins = [
#         'http://my-dischord.herokuapp.com',
#         'https://my-dischord.herokuapp.com'
#     ]
# else:
origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True)


# handle chat messages
@socketio.on("chat")
def handle_chat():
    emit("chat", broadcast=True)


@socketio.on("login")
def handle_login(data):
    # print(data, 'USER HERE NOW BETCH ==========================================================')
    user = User.query.get(data['id'])
    # print(user, 'USER HERE ==================================================================================================================================================================================================================')

    user.online = True
    db.session.commit()
    emit("login", data, broadcast=True)

    def logout(user):
        user = User.query.get(data['id'])
        user.online = False
        db.session.commit()
        emit("logout", data, broadcast=True)


@socketio.on("logout")
def handle_logout(data):

    user = User.query.get(data['id'])
    user.online = False
    db.session.commit()
    emit("logout", data, broadcast=True)

@socketio.on("sign-up")
def handle_sign_up(data):
    # print(data['id'], 'USER HERE NOW BETCH')
    user = User.query.get(data['id'])
    # print('USER HERE')
    print(user, 'USER HERE')
    user.online = True
    db.session.commit()
    emit("sign-up", data, broadcast=True)
    emit("login", data, broadcast=True)
