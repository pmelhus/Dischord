from wtforms.validators import ValidationError

def check_public_boolean(form, field):
  # Checking boolean field value
  if field.data == None:
    raise ValidationError("Privacy must be set to private or public.")
