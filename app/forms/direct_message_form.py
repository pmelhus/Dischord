from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length



class DirectMessageForm(FlaskForm):
    inbox_id = IntegerField('inbox_id', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired(), Length(
        min=0, max=1000, message='Message cannot be longer than 1000 characters')])
    edited = BooleanField('edited')
