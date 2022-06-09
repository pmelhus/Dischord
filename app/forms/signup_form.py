from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from flask_wtf.file import FileAllowed
from wtforms.validators import DataRequired, ValidationError, Length, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[
                        DataRequired(), user_exists, Length(min=6, max=40)])
    password = StringField('Password', validators=[DataRequired(), Length(
        min=6, max=20), EqualTo('confirm_password', message="Passwords must match")])
    confirm_password = StringField('Confirm Password', validators=[
                                   DataRequired(), Length(min=6, max=20)])
