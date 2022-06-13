from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from app.forms import SignUpForm, UserEdit, UserEditPassword
from ..utils.s3utils import (
    upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/password/<int:id>', methods=['PATCH'])
@login_required
def edit_user_password(id):
    # print('=====================')
    user = User.query.get(id)
    form = UserEditPassword()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.password = form.data['password']
        db.session.commit()
        return user.to_dict()
    else:

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_user(id):
    # print('=====================')
    user = User.query.get(id)
    form = UserEdit()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # then the upload le failed, oh no!
            return upload, 400
        url = upload["url"]

    if form.validate_on_submit():
        user.username = form.data['username']
        user.email = form.data['email']
        user.bio = form.data['bio']
        if "image" in request.files:
            user.image_url = url
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
