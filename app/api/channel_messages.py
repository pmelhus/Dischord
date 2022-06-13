from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, ChannelMessage
from app.forms import ChannelMessageForm

channel_message_routes = Blueprint('channel_messages', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

@channel_message_routes.route('/', methods=["POST"])
@login_required
def channel_message_submit():
    print('hello')
    form = ChannelMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    params = {
        "channel_id": form.data['channel_id'],
        'user_id': form.data['owner_id'],
        "content": form.data['content'],
        "edited": form.data['edited']
    }

    if form.validate_on_submit():
        channel_message = ChannelMessage(**params)
        db.session.add(channel_message)
        db.session.commit()
        return channel_message.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
