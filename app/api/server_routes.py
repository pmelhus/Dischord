from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Server
from app.forms import ServerForm
from ..utils.s3utils import (
    upload_file_to_s3, allowed_file, get_unique_filename)

server_routes = Blueprint('servers', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@server_routes.route('/')
@login_required
def servers():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>')
@login_required
def server(id):
    server = Server.query.get(id)
    return server.to_dict()


@server_routes.route('/', methods=["POST"])
@login_required
def server_form_submit():
    form = ServerForm()
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


        params = {
            "owner_id": form.data['owner_id'],
            "name": form.data['name'],
            "public": form.data['public'],
            "image_url": url
        }
    else:


        params = {
            "owner_id": form.data['owner_id'],
            "name": form.data['name'],
            "public": form.data['public']
        }

    if form.validate_on_submit():
        server = Server(**params)
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def server_update(id):
    server = Server.query.get(id)
    form = ServerForm()
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
        server.owner_id = form.data['owner_id']
        server.name = form.data['name']
        server.public = form.data['public']
        if "image" in request.files:
            server.image_url = url
        db.session.commit()
        return server.to_dict()
    else:

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def server_delete(id):
    # print('====================================')
    server = Server.query.get(id)
    if not server:
        return {"errors": f"No server with id {id} exists"}, 404
    else:
        db.session.delete(server)
        db.session.commit()
        return server.to_dict()
