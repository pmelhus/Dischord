from flask_socketio import SocketIO, emit, send
import os


# configure cors_allowed_origins
# if os.environ.get('FLASK_ENV') == 'production':
#     origins = [
#         'http://my-dischord.herokuapp.com',
#         'https://my-dischord.herokuapp.com'
#     ]
# else:
origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on("login")
def handle_login(data):
    emit("login", data, broadcast=True)
