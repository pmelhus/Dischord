from ..models import db, Channel


channels = [
    {
        "server_id": 1,
        "name": "Pahk the Cah",
        "description": "Matt Damon"
    },
    {
        "server_id": 1,
        "name": "In Hahvahd Yahd",
        "description": "Ben Affleck"
    },
    {
        "server_id": 4,
        "name": "Nezuko's Channel",
        "description": "NEZUKO CHAAAAN"
    },
    {
        "server_id": 4,
        "name": "ZZZZ",
        "description": None
    }
]


def seed_channels():
    seeder = [Channel.seed(channel) for channel in channels]
    db.session.add_all(seeder)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
