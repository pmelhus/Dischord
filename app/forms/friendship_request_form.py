from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, ValidationError
from app.models import db, FriendshipRequest, User, Friendship
from wtforms.validators import DataRequired
from sqlalchemy import and_


class FriendshipRequestForm(FlaskForm):
    def check_username(form, field):

        # check if username exists
        existing_user = User.query.filter(User.username == field.data).one()
        #  = User.query.get(form["self_id"].data)

        if not existing_user:
            raise ValidationError("User does not exist!")


        # check if request already exists
        if existing_user:
            existing_friendship = Friendship.query.filter(and_(
            Friendship.self_id == form['self_id'].data, Friendship.friend_id == existing_user.id)).one_or_none()
            if existing_friendship:
                raise ValidationError("You're already friends with this user.")
            existing_request = FriendshipRequest.query.filter(
                FriendshipRequest.self_id == form['self_id'].data, FriendshipRequest.friend_id == existing_user.id).one_or_none()
            if existing_request:
                raise ValidationError(
                    "A friend request has already been sent!")

        print(form["self_id"].data, "YEHA")
    self_id = IntegerField('self_id', validators=[
                           DataRequired(message="self Id is required")])
    friend_username = StringField('friend_username', validators=[
                                  DataRequired(message="No username entered"), check_username])
