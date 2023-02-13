from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, ValidationError
from app.models import db, FriendshipRequest, User
from wtforms.validators import DataRequired




class FriendshipRequestForm(FlaskForm):
  def check_username(form, field):

    existing_user = User.query.filter(User.username == field.data).one()
    if not existing_user:
      raise ValidationError("User does not exist!")
    existing_request = 

  self_id = IntegerField('self_id', validators=[DataRequired(message="self Id is required")])
  friend_username = StringField('friend_username', validators=[DataRequired(message="No username entered"), check_username])
