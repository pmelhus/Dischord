from ..models import db, Channel


# channels = [
#   {
#     "server_id": 1,
#     "name": ""
#   }
# ]


def seed_channels():
    seeder = [Channel.seed(channel) for channel in channels]
    db.session.add_all(seeder)
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
