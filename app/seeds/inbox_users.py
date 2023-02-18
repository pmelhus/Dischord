from app.models import db, User, Inbox


# def seed_inbox_users():

def undo_inbox_users():
    db.session.execute('TRUNCATE inbox_users RESTART IDENTITY CASCADE;')
    db.session.commit()
