from ..models import db, Friendship
from app.utils.uuid_creator import generate_uuid

friendships = [
    {
    'self_id': 1,
    'friend_id': 2,
    'dm_uuid': generate_uuid()
    }
]


def seed_friendships():
    seeder = [Friendship.seed(friendship) for friendship in friendships]
    db.session.add_all(seeder)
    db.session.commit()


def undo_friendships():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
