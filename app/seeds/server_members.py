from app.models import db, User, Server
from datetime import datetime


def seed_server_members():
    u1 = User().query.filter(User.id < 10)
    s1 = Server().query.get(1)
    s2 = Server().query.get(2)
    u2 = User().query.filter(User.id > 9, User.id < 17)
    user1 = User().query.get(1)
    # print(u2, 'here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!here!!!!')
    for user in u1:
      user.memberships.append(s1)
      db.session.add(user)
    for user in u2:
      user.memberships.append(s2)
      db.session.add(user)
    user1.memberships.append(s2)
    user2 = User().query.get(6)
    user2.memberships.append(s2)
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

def undo_server_members():
    db.session.execute('TRUNCATE server_members RESTART IDENTITY CASCADE;')
    db.session.commit()
