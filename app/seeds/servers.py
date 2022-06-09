from ..models import db, Server

servers = [
    {
        "owner_id": 1,
        "name": "Demo Apples",
        "image_url": "https://dischord-profile-images.s3.amazonaws.com/app.png",
        "public": False
    },
    {
        "owner_id": 1,
        "name": "DEMOlisher",
        "image_url": "https://dischord-profile-images.s3.amazonaws.com/demolisher.jpeg",
        "public": False
    },
    {
        "owner_id": 3,
        "name": "Now or Never",
        "image_url": "https://dischord-profile-images.s3.amazonaws.com/bon2.jpeg",
        "public": False
    },
    {
        "owner_id": 5,
        "name": "NezukoChan4Ever",
        "image_url": "https://dischord-profile-images.s3.amazonaws.com/Nezuko-Sparkles.webp",
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
