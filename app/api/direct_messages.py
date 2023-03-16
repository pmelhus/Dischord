from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, DirectMessage
from app.forms import DirectMessageForm

direct_message_routes = Blueprint('direct_messages', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

@direct_message_routes.route('/', methods=["POST"])
@login_required
def direct_message_submit():

    form = DirectMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data['server_invite']:
        params = {
            "inbox_id": form.data['inbox_id'],
            'owner_id': form.data['owner_id'],
            "content": form.data['content'],
            "edited": form.data['edited'],
            "server_invite": form.data['server_invite'],
            "server_invite_id": form.data['server_invite_id']
        }

    else:
        params = {
            "inbox_id": form.data['inbox_id'],
            'owner_id': form.data['owner_id'],
            "content": form.data['content'],
            "edited": form.data['edited'],
        }

    if form.validate_on_submit():
        print('hello')
        direct_message = DirectMessage(**params)
        db.session.add(direct_message)
        db.session.commit()
        return {"direct_message": direct_message.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@direct_message_routes.route('/<int:id>')
@login_required
def get_messages(id):

    direct_messages = DirectMessage.query.filter(DirectMessage.inbox_id == id).all()

    # print(direct_messages, '==================')
    if not len(direct_messages):
        return {"errors": ["No messages to be found"]}
    else:
        return {'direct_messages': [direct_message.to_dict() for direct_message in direct_messages]}

@direct_message_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def message_update(id):

    direct_message = DirectMessage.query.get(id)
    if not direct_message:
      return {"errors": "No estate"}, 404
    form = DirectMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print(form.data, 'BETCH')
        direct_message.inbox_id = form.data['inbox_id']
        direct_message.owner_id = form.data['owner_id']
        direct_message.content = form.data['content']
        direct_message.edited = form.data['edited']
        db.session.commit()
        return direct_message.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@direct_message_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def server_delete(id):
    direct_message = DirectMessage.query.get(id)
    if not direct_message:
        return {"errors": f"No channel message with id {id} exists"}, 404
    else:
        db.session.delete(direct_message)
        db.session.commit()
        return direct_message.to_dict()
