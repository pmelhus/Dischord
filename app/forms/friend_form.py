from flask_wtf import FlaskForm
from wtforms import IntegerField
from app.models import db, Friend
from wtforms.validators import DataRequired

class FriendForm(FlaskForm):
  user_id_self = IntegerField('user_id_self', validators=[DataRequired(message="self Id is required")])
  user_id_friend = IntegerField('user_id_friend', validators=[DataRequired(message="friend Id is required")])
  