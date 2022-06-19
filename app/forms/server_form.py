from pickle import FALSE
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, FileField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import db, Server
from flask_wtf.file import FileAllowed
from .custom_validators import check_public_boolean

class ServerForm(FlaskForm):
  owner_id = IntegerField('owner_id', validators=[DataRequired(message="Owner Id is required")])
  name = StringField('server_name', validators=[Length(min=2, max=26, message='Server name must be between 2 and 26 characters long')])
  image_url = FileField('image_url', validators=[FileAllowed(['jpeg', 'jpg', 'png', 'gif', 'tiff', 'img'])])
  public = BooleanField('privacy', validators=[check_public_boolean])
