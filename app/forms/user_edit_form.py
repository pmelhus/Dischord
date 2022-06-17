from email.message import EmailMessage
from flask_wtf import FlaskForm
from wtforms import StringField, FileField, TextAreaField, IntegerField
from flask_wtf.file import FileAllowed
from wtforms.validators import DataRequired, ValidationError, Length, EqualTo, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    current_user = User.query.get(form.id.data)
    if current_user.email == email:
        return
    user = User.query.filter(User.email == email).first()
    if user and current_user.email != EmailMessage:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    current_user = User.query.get(form.id.data)
    if current_user.username == username:
        return
    user = User.query.filter(User.username == username).first()
    if user and current_user.username != username:
        raise ValidationError('Username is already in use.')



class UserEdit(FlaskForm):
    id = IntegerField('user_id')
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, Length(min=6, max=40), Email(message="Must be a valid email address")])
    image = FileField('image_file', validators=[FileAllowed(['jpeg', 'jpg', 'png', 'gif', 'tiff', 'img'])])
    bio = TextAreaField('bio', validators=[Length(min=0 ,max=190)])
