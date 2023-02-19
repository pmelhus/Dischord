from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Friendship, User, Inbox, inbox_users
from app.forms import FriendshipRequestForm, FriendshipForm
from sqlalchemy import and_, or_, not_
from app.utils.uuid_creator import generate_uuid
from app.utils.find_in_list import find_in_list

inbox_routes = Blueprint('inboxes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@inbox_routes.route('/', methods=["POST"])
@login_required
def create_inbox():
    params = {
        "dm_uuid": generate_uuid()
    }
    inbox = Inbox(**params)
    db.session.add(inbox)
    db.session.commit()

    return {"inbox": inbox.to_dict()}

@inbox_routes.route('/add_members', methods=["POST"])
@login_required
def add_members():
    user_a = User.query.get(request.form['self_id'])
    user_b = User.query.get(request.form['friend_id'])
    inbox = Inbox.query.get(request.form['inbox_id'])

    inbox.inbox_members.append(user_b)
    inbox.inbox_members.append(user_a)
    db.session.add(inbox)
    db.session.commit()

    return {"member_1": user_a.to_dict(), "member_2": user_b.to_dict()}

@inbox_routes.route('/get_one/<int:self_id>/<int:friend_id>')
@login_required
def getOneInbox(self_id, friend_id):
    ids = {self_id, friend_id}
    inboxes = Inbox.query.all()
    inbox = find_in_list(ids, inboxes)
    if inbox:
        inbox_class = Inbox.query.get(inbox.id)
        return {"inbox": inbox_class.to_dict()}
    else:
        return {'errors': 'No inbox was found with the given members'}


@inbox_routes.route('/get_all/<int:id>')
@login_required
def getAllInboxes(id):

    all_inbox_users = db.session.query(inbox_users).all()
    print(all_inbox_users, 'INBOX USERS')
    relevant_inbox_ids=[]

    for user in all_inbox_users:
        if user.user_id == id:
            relevant_inbox_ids.append(user.inbox_id)
    if len(relevant_inbox_ids):

        inboxes = Inbox.query.where(Inbox.id.in_(relevant_inbox_ids)).all()

        return {"inboxes": [inbox.to_dict() for inbox in inboxes]}
    else:

        return {'errors': "No inboxes associated with this user ID"}
