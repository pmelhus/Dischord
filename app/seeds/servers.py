from ..models import db, Server

servers = [
    {
        "owner_id": 1,
        "name": "The World of Pop",
        "image_url": "https://dischord-profile-images.s3.amazonaws.com/80faf884d4564afd84f0248980922b63.png",
        "public": False
    },

    {
        "owner_id": 1,
        "name": "Hip Hop Shop",
        "image_url": "https://dischord-profile-images.s3.amazonaws.com/hip-hop-image.jpeg",
        "public": False
    },
    # {
    #     "owner_id": 1,
    #     "name": "Classic Classical",
    #     "image_url": "https://dischord-profile-images.s3.amazonaws.com/bon2.jpeg",
    #     "public": True
    # },
    # {
    #     "owner_id": 1,
    #     "name": "Jazz isn't Dead",
    #     "image_url": "https://dischord-profile-images.s3.amazonaws.com/jazz-image.jpeg",
    #     "public": True
    # }
]


def seed_servers():
    seeder = [Server.seed(server) for server in servers]
    db.session.add_all(seeder)
    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
