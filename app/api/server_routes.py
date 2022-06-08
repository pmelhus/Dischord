from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Server
from app.forms import ServerForm

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

    params = {
        "user_id": form.data['user_id'],
        "name": form.data['name'],
        "public": form.data['public']
    }
    # print('=-0=-0=-0=-0=-0=-0=-0=-0=-0=-0')
    # print(form.data)
    # print('=-0=-0=-0=-0=-0=-0=-0=-0=-0=-0')
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
    # print('----------patch charters route')
    server = Server.query.get(id)
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('=-aptch=-0=-0=-0=-0=-0=-0')
    # print(form.data)
    # print('=-aptch=-0=-0=-0=-0=-0=-0')
    if form.validate_on_submit():
    #   print('--------form is validated')
      server.user_id = form.data['user_id']
      server.name = form.data['name']
      server.image_url = form.data['image_url']
      server.public = form.data['public']
      db.session.commit()
      return server.to_dict()
    else:
    #   print('*/-/*-*/-/*-*-/*-/-*/*-/errrrrrrorsrs*/-*/-*-/*/-/*--/*/*-/*-*/-*-/')
    #   print(form.errors)
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def server_delete(id):
    server = Server.query.get(id)
    if not server:
        return {"errors": f"No server with id {id} exists"}, 404
    else:
        db.session.delete(server)
        db.session.commit()
        return server.to_dict()
