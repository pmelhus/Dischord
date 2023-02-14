from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, ValidationError
from app.models import db, FriendshipRequest, User, Friendship
from wtforms.validators import DataRequired
from sqlalchemy import and_


class FriendshipForm(FlaskForm):

    def check_if_exists(form, field):
        existing_friendship = Friendship.query.filter(and_(
            Friendship.self_id == form['self_id'].data, Friendship.friend_id == form['friend_id'].data)).one_or_none()
        if existing_friendship:
            raise ValidationError("You're already friends with this user.")
    self_id = IntegerField('self_id', validators=[
                           DataRequired(message="self Id is required"), check_if_exists])
    friend_id = IntegerField('friend_id', validators=[
        DataRequired(message="No username entered"), check_if_exists])
