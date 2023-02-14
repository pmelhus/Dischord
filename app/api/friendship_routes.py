from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Friendship, FriendshipRequest, User
from app.forms import FriendshipRequestForm

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


@friendship_routes.route('/<int:id>')
@login_required
def getFriendship(id):
    friendship = Friendship.query.filter(Friendship.user_id_self == id)
    return {'friendship': [friendship.to_dict() for friendship in friendships]}

# This route creates a new friend connection


# @friendship_routes.route('/', methods=["POST"])
# @login_required
# def createFriendship():
#     form = FriendshipRequestForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     params = {
#         "user_id_self": form.data['user_id_self'],
#         "user_id_friend": form.data['user_id_friend']
#     }
#     if form.validate_on_submit():
#         friendship = Friendship(**params)
#         db.session.add(friendship)
#         db.session.commit()
#         return friendship.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# This route creates a pending friend request

@friendship_routes.route('/', methods=["POST"])
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


@friendship_routes.route('/<int:self>/<int:friend>', methods=["DELETE"])
@login_required
def friend_delete(self, friend):
    friendship = Friend.query.filter(
        Friendship.user_id_self == self & Friendship.user_id_friend == friend)
    if not friendship:
        return {"errors": f"This friendship does not exist"}, 404
    else:
        db.session.delete(friend)
        db.session.commit()
        return friendship.to_dict()
