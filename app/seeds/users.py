from app.models import db, User


# Adds a listener user, you can add other users here if you want
def seed_users():

    listener = User(
        username='The Listener', email='the@listener.com', password='password', bio="I'm a great listener.", image_url="https://dischord-profile-images.s3.amazonaws.com/the-listener.png")
    michael = User(
        username='The Real King of Pop', email='michael@jackson.com', password='password', bio="Hee-Hee!!!", image_url="https://dischord-profile-images.s3.amazonaws.com/michael+jackson.jpeg")
    harry = User(
        username='The New King of Pop', email='harry@styles.com', password='password', bio="Watermelon sugar... hi!", image_url="https://dischord-profile-images.s3.amazonaws.com/harry-styles.jpeg")
    justin = User(
        username='J-Beebs', email='justin@bieber.com', password='password', bio="Baby, baby, baby, OOOO!", image_url="https://dischord-profile-images.s3.amazonaws.com/justin-bieber-gettyimages-1202421980.jpg")
    taylor = User(
        username='T-Swizzle', email='taylor@swift.com', password='password', bio="I'm the problem.", image_url="https://dischord-profile-images.s3.amazonaws.com/tswift.jpg")
    beyonce = User(
        username='Sasha Fierce', email='be@yonce.com', password='password', bio="If you liked it, then you should have put a ring on it.", image_url="https://dischord-profile-images.s3.amazonaws.com/yonce.png")
    bruno = User(
        username='The Bruno', email='bruno@mars.com', password='password', bio="Don't believe me, just watch.", image_url="https://dischord-profile-images.s3.amazonaws.com/bruno-mars.jpeg")
    mariah = User(
        username="Mariah", email='mariah@carey.com', password='password', bio='All I want for Christmas is ... more Christmas!', image_url="https://dischord-profile-images.s3.amazonaws.com/mariahxmas.jpg")
    whitney = User(
        username="Whitney", email='whitney@houston.com', password='password', bio="I just want to dance!", image_url="https://dischord-profile-images.s3.amazonaws.com/whitneyho.jpeg")
    drake = User(
        username="Drizzy", email='drake@drake.com', password='password', bio="I need a one dance.", image_url="https://dischord-profile-images.s3.amazonaws.com/drake.jpeg")
    eminem = User(
        username="The Real Slim Shady", email='slim@shady.com', password='password', bio="May I have your attention, please?", image_url="https://dischord-profile-images.s3.amazonaws.com/eminem.jpeg")
    kanye = User(
        username='Yeezy', email='kanye@west.com', password='password', bio="I feel like I'm too busy writing history to read it.", image_url="https://dischord-profile-images.s3.amazonaws.com/kanye.jpeg")
    jay = User(
        username="Mr. Carter", email='jay@z.com', password='password', bio='I put a ring on it.', image_url="https://dischord-profile-images.s3.amazonaws.com/jay+z.jpeg")
    kendrick = User(
        username="K-Dot", email='kendrick@lamar.com', password='password', bio="Don't kill my vibe.", image_url="https://dischord-profile-images.s3.amazonaws.com/kdrick.jpeg")
    snoop = User(
        username="Snoop Doggy Dog", email='snoop@dog.com', password='password', bio="Gin and juice.", image_url="https://dischord-profile-images.s3.amazonaws.com/snoop.jpeg")
    paak = User(
        username="The Paak", email='anderson@paak.com', password='password', bio="I won't bite, unless you like.", image_url="https://dischord-profile-images.s3.amazonaws.com/paak.jpg")
    dre = User(
        username="The Paak", email='anderson@paak.com', password='password', bio="I won't bite, unless you like.", image_url="https://dischord-profile-images.s3.amazonaws.com/paak.jpg")

    user_list = [listener, michael, harry, justin, taylor, beyonce, bruno, mariah, whitney, drake, eminem, kanye, jay, kendrick, snoop, paak]

    for user in user_list:
        db.session.add(user)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
