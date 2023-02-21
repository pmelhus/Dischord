from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Friendship, FriendshipRequest, User
from app.forms import FriendshipRequestForm, FriendshipForm
from sqlalchemy import and_, or_, not_
from app.utils.uuid_creator import generate_uuid

friendship_routes = Blueprint('friendships', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

# This route retrieves all the friends of a particular friend id (user_id_self)


@friendship_routes.route('/requests/<int:id>')
@login_required
def getRequests(id):
    requests = FriendshipRequest.query.filter(or_(FriendshipRequest.self_id == id, FriendshipRequest.friend_id == id)).all()

    return {'requests': [request.to_dict() for request in requests]}

# This route retrieves all friendships
@friendship_routes.route('/<int:id>')
@login_required
def getFriends(id):
    friends = Friendship.query.filter(or_(Friendship.self_id == id, Friendship.friend_id == id)).all()

    return {'friends': [friend.to_dict() for friend in friends]}

# This route creates a new friend connection


@friendship_routes.route('/', methods=["POST"])
@login_required
def createFriendship():
    form = FriendshipForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        params = {
            "self_id": form.data['self_id'],
            "friend_id": form.data['friend_id'],
        }

        friendship = Friendship(**params)
        db.session.add(friendship)
        db.session.commit()
        return friendship.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# This route creates a pending friend request

@friendship_routes.route('/requests/', methods=["POST"])
@login_required
def create_friendship_request():

    form = FriendshipRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.where(User.username == form.data['friend_username']).one()
        params = {
            "self_id": form.data['self_id'],
            "friend_id": user.id
        }


        friendship_request = FriendshipRequest(**params)
        db.session.add(friendship_request)
        db.session.commit()
        return friendship_request.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# This route deletes a friend connection


@friendship_routes.route('/requests/<int:id>', methods=["DELETE"])
@login_required
def request_delete(id):
    request = FriendshipRequest.query.get(id)
    if not request:
        return {"errors": f"This request does not exist"}, 404
    else:
        db.session.delete(request)
        db.session.commit()
        return request.to_dict()
