import os
import sched
import time
from flask_socketio import SocketIO, emit, send
from app.models import db, User

from threading import Timer


# arguments:
# how long to wait (in seconds),
# what function to call,
# what gets passed in


# configure cors_allowed_origins
# if os.environ.get('FLASK_ENV') == 'production':
#     origins = [
#         'http://my-dischord.herokuapp.com',
#         'https://my-dischord.herokuapp.com'
#     ]
# else:
origins = "*"

# s = sched.scheduler(time.time, time.sleep)
# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True)

# timer(10.0)

# changes user activity to idle


def change_idle(user):
    # print(user, 'USER================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================')
    user.idle = True
    db.session.commit()

# a timer to change the activity of user


#


# def timeout_scheduler(sc):
#     print("Timeout scheduler ran!")
#     # timeout_user()
#     sc.enter(60, 1, timeout_scheduler)

# s.enter(60, 1, timeout_scheduler)
# s.run()

# handle chat messages
#
@socketio.on("chat")
def handle_chat(id):
    user = User.query.get(id)
    user.idle = False
    db.session.commit()
    emit("chat", broadcast=True)


@socketio.on("dmChat")
def handle_chat(id, inbox_id):
    user = User.query.get(id)

    emit("dmChat", {'inbox_id': inbox_id}, broadcast=True)


@socketio.on('change_idle')
def change_idle(id):

    user = User.query.get(id)
    user.idle = False
    db.session.commit()


@socketio.on('timeout_user')
def timeout_user():
    users = User.query.all()
    for user in users:
        if not user.online and user.idle:
            user.online = False
            db.session.commit()
            emit("logout", user, broadcast=True)


@socketio.on("login")
def handle_login(data):
    # print(data, 'USER HERE NOW BETCH ==========================================================')
    user = User.query.get(data['id'])
    # print(user, 'USER HERE ==================================================================================================================================================================================================================')

    user.online = True
    user.idle = False
    db.session.commit()
    emit("login", data, broadcast=True)
    # idle_timer(user)


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
    # print(user, 'USER HERE')
    user.online = True
    user.idle = False
    db.session.commit()
    emit("sign-up", data, broadcast=True)
    emit("login", data, broadcast=True)
    # idle_timer(user)


    # print(user, 'USER================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================')


# socketio.on("connection", (socket) => {
# });
