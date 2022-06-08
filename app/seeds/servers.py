from ..models import db, Server

servers = [
    {
        "owner_id": 1,
        "name": "Demo Apples",
        "image_url": "s3://dischord-profile-images/app.png",
        "public": False
    },
    {
        "owner_id": 1,
        "name": "DEMOlisher",
        "image_url": "s3://dischord-profile-images/demolisher.jpeg",
        "public": False
    },
    {
        "owner_id": 3,
        "name": "Now or Never",
        "image_url": "s3://dischord-profile-images/bon2.jpeg",
        "public": False
    },
    {
        "owner_id": 5,
        "name": "NezukoChan4Ever",
        "image_url": "s3://dischord-profile-images/Nezuko-Sparkles.webp",
        "public": False
    }
]


def seed_servers():
    seeder = [Server.seed(server) for server in servers]
    db.session.add_all(seeder)
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
