from app.models import db, User, Inbox


def seed_inbox_users():
    u1 = User().query.get(1)
    u2 = User().query.get(2)
    u3 = User().query.get(3)
    u4 = User().query.get(4)
    u5 = User().query.get(5)
    u6 = User().query.get(6)
    inbox1 = Inbox().query.get(1)
    inbox2 = Inbox().query.get(2)
    inbox3 = Inbox().query.get(3)
    inbox4 = Inbox().query.get(4)
    inbox5 = Inbox().query.get(5)

    inbox1.inbox_members.append(u1)
    inbox1.inbox_members.append(u2)
    db.session.add(inbox1)

    inbox2.inbox_members.append(u1)
    inbox2.inbox_members.append(u3)
    db.session.add(inbox2)

    inbox3.inbox_members.append(u1)
    inbox3.inbox_members.append(u4)
    db.session.add(inbox3)

    inbox4.inbox_members.append(u1)
    inbox4.inbox_members.append(u5)
    db.session.add(inbox4)

    inbox5.inbox_members.append(u2)
    inbox5.inbox_members.append(u3)
    db.session.add(inbox5)

    db.session.commit()


def undo_inbox_users():
    db.session.execute('TRUNCATE inbox_users RESTART IDENTITY CASCADE;')
    db.session.commit()
