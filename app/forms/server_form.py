from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, FileField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import db, Server
from flask_wtf.file import FileAllowed

class ServerForm(FlaskForm):
  owner_id = IntegerField('Owner Id', validators=[DataRequired(message="Owner Id is required")])
  name = StringField('Server name', validators=[Length(min=2, max=32, message='Server name must be between 2 and 32 characters long')])
  image_url = FileField('Image file', validators=[FileAllowed(['jpeg', 'jpg', 'png', 'gif', 'tiff', 'img'])])
  public = BooleanField('Server privacy')
