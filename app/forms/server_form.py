from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, Server

class ServerForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
