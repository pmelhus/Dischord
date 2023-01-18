from ..models import db, Channel


channels = [
    {
        "server_id": 1,
        "name": "The Popular kids",
        "description": "Who's the real king of pop?"
    },
    {
        "server_id": 2,
        "name": "The coasts",
        "description": "Tupac or Biggie?"
    },
    # {
    #     "server_id": 3,
    #     "name": "Nezuko's Channel",
    #     "description": "NEZUKO CHAAAAN"
    # },
    # {
    #     "server_id": 4,
    #     "name": "ZZZZ",
    #     "description": None
    # }
]


def seed_channels():
    seeder = [Channel.seed(channel) for channel in channels]
    db.session.add_all(seeder)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
