from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length



class ChannelMessageForm(FlaskForm):
    channel_id = IntegerField('channel_id', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    edited = BooleanField('edited')
