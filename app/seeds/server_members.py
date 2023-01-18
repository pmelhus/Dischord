# from app.models import db, server_members
# from datetime import datetime

# def seed_server_members():
#   listener = {"user_id": 1, "server_id": 1, "member_since": datetime.now()}

#   db.session.commit()

# def undo_server_members():
#     db.session.execute('TRUNCATE server_members RESTART IDENTITY CASCADE;')
#     db.session.commit()
