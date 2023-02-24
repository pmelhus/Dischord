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
    requests = FriendshipRequest.query.filter(
        or_(FriendshipRequest.self_id == id, FriendshipRequest.friend_id == id)).all()

    return {'requests': [request.to_dict() for request in requests]}

# This route retrieves all friendships


@friendship_routes.route('/<int:id>')
@login_required
def getFriends(id):
    friends = Friendship.query.filter(
        or_(Friendship.self_id == id, Friendship.friend_id == id)).all()

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
        user = User.query.where(
            User.username == form.data['friend_username']).one()
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

# route grabs the most frequent mutual friends between sessionUsers current friends


@friendship_routes.route('/mutual_friends/<int:id>')
@login_required
def get_mutuals(id):
    # filters friendships to only friendships belonging to the session user
    users_friendships = Friendship.query.filter(
        or_(Friendship.self_id == id, Friendship.friend_id == id)).all()

    # initializes a set to store the session user's friends' ids
    session_u_friend_id_set = set()
    for friendship in users_friendships:
        session_u_friend_id_set.add(friendship.return_other_friend(id).id)

    # filters friendships to friendships that do not have the session user's id present (friendships the session user is not a part of)
    friends_friendships = Friendship.query.filter(
        not_(or_(Friendship.self_id == id, Friendship.friend_id == id))).all()

    # initializes dictionary of the number of frequencies a user id appears in a friendship between the session user's friends list
    friends_friendships_ids = {}
    mutual_friends = []

    for friendship in friends_friendships:
        # checks if the ids in friendship modal are in the session user's friends list and adds the ids not in the session users friend list to a dictionary with a value of the frequency they appear
        if friendship.return_self_user().id not in session_u_friend_id_set and friendship.return_friend_user().id in session_u_friend_id_set:
            if f'{friendship.return_self_user().id}' in friends_friendships_ids:
                friends_friendships_ids[f'{friendship.return_self_user().id}'] += 1
                mutual_friends.append(friendship)
            else:
                friends_friendships_ids[f'{friendship.return_self_user().id}'] = 1
        if friendship.return_friend_user().id not in session_u_friend_id_set and friendship.return_self_user().id in session_u_friend_id_set:
            if f'{friendship.return_friend_user().id}' in friends_friendships_ids:
                friends_friendships_ids[f'{friendship.return_friend_user().id}'] += 1
                mutual_friends.append(friendship)
            else:
                friends_friendships_ids[f'{friendship.return_friend_user().id}'] = 1

    # sorts dictionary by the value of the keys (user ids) in descending order
    sorted_converted_friends = dict(
        sorted(friends_friendships_ids.items(), key=lambda x: x[1], reverse=True))

    # queries user by the dictionary user ids and appends the user class to a list to be sent as a response to the front end if the frequency is above 1 (indicates theres more than one friend in common)
    recommended_friends_list = []
    for key, value in sorted_converted_friends.items():
        if value > 1:
            user = User.query.get(int(key))
            recommended_friends_list.append(user)



    return {'users': [user.to_dict() for user in recommended_friends_list], "mutual_friendships": [friendship.to_dict() for friendship in mutual_friends]}
