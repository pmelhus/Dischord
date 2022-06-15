from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='How about demo apples?', image_url="https://dischord-profile-images.s3.amazonaws.com/app.png")
    vern = User(
        username='Coolycool510', email='cool@cool.com', password='password', bio="I'm too cooly cool for you!", image_url=None)
    bon = User(
        username='BonJovi', email='bon@jovi.com', password='password', bio="It's my life!", image_url="https://dischord-profile-images.s3.amazonaws.com/bon2.jpeg")
    darren = User(
        username='ComeEatChinaCity', email='china@city.com', password='password', bio="Ara smells!", image_url=None)
    ara = User(
        username='Zensan', email='zen@san.com', password='password', bio="NEZUKO-CHAAAAN!!!", image_url="https://dischord-profile-images.s3.amazonaws.com/zen.jpeg")
    chris = User(
        username='Push2Main', email='chris@thegrepper.com', password='password', bio="Nothing will get in the way of me and my taco bell... HELLO?!", image_url=None)
    brianna = User(
        username='AtlShawty', email='atl@shawty.com', password='password', bio="Go Hawks!", image_url=None)
    brendan = User(
        username='Week6', email='week@6.com', password='password', bio='WEEK 6?!?! HELLO?!?', image_url=None)
    anthony = User(
        username="TheBroncaNator", email='bronca@bronca.com', password='password', bio="Ara ara...", image_url=None)
    
    db.session.add(demo)
    db.session.add(vern)
    db.session.add(bon)
    db.session.add(darren)
    db.session.add(ara)
    db.session.add(chris)
    db.session.add(brianna)
    db.session.add(brendan)
    db.session.add(anthony)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
