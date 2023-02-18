from ..models import db, Inbox
from app.utils.uuid_creator import generate_uuid

inboxes = [

]


def seed_inboxes():
    seeder = [Inbox.seed(inbox) for inbox in inboxes]
    db.session.add_all(seeder)
    db.session.commit()


def undo_inboxes():
    db.session.execute('TRUNCATE inboxes RESTART IDENTITY CASCADE;')
    db.session.commit()
