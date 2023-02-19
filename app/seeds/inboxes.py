from ..models import db, Inbox
from app.utils.uuid_creator import generate_uuid

def generate_multiple_inboxes(number_of_inboxes):
    inbox_list = []
    for x in range(number_of_inboxes):
        inbox_list.append({"dm_uuid": generate_uuid()})
    return inbox_list

inboxes = generate_multiple_inboxes(5)


def seed_inboxes():
    seeder = [Inbox.seed(inbox) for inbox in inboxes]
    db.session.add_all(seeder)
    db.session.commit()


def undo_inboxes():
    db.session.execute('TRUNCATE inboxes RESTART IDENTITY CASCADE;')
    db.session.commit()
