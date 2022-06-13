from email.message import EmailMessage
from flask_wtf import FlaskForm
from wtforms import StringField, FileField, TextAreaField, IntegerField
from flask_wtf.file import FileAllowed
from wtforms.validators import DataRequired, ValidationError, Length, EqualTo
from app.models import User
from werkzeug.security import generate_password_hash


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    user = User.query.filter(User.id == form.id.data).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class UserEditPassword(FlaskForm):
    id = IntegerField('user_id')
    password = StringField('password', validators=[DataRequired(), Length(
        min=6, max=20), EqualTo('confirm_password', message="Passwords must match")])
    confirm_password = StringField('confirm_password', validators=[
        DataRequired(), Length(min=6, max=20)])
    current_password = StringField(
        'current_password', validators=[password_matches])
