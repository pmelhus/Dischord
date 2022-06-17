from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class ChannelForm(FlaskForm):
    server_id = IntegerField('server_id', validators=[DataRequired()])
    name = StringField('channel_name', validators=[Length(
        min=2, max=26, message='Channel name must be between 2 and 27 characters long')])
    description = StringField('description', validators=[Length(
        min=0, max=200, message='Channel description cannot be longer than 200 characters')])
