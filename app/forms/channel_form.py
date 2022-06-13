from flask_wtf import FlaskForm
from wtforms import StringField, FileField, IntegerField
from flask_wtf.file import FileAllowed
from wtforms.validators import DataRequired, ValidationError, Length, EqualTo
from app.models import User


class ChannelForm(FlaskForm):
    server_id = IntegerField('server_id', validators=[DataRequired()])
    name = StringField('channel_name', validators=[Length(
        min=2, max=32, message='Channel name be between 2 and 32 characters long')])
    description = StringField('description', validators=[Length(
        min=0, max=200, message='Channel name be between 0 and 200 characters long')])
