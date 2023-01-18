from app.models import db, ChannelMessage

def seed_channel_messages():
    m1 = ChannelMessage(
        channel_id=1, user_id=2, content="I am starting with the man in the mirror. And that's me, the king of pop! Get out of here Harry Styles. HEE HEE!"
    )
    m2 = ChannelMessage(
        channel_id=1, user_id=3, content="Be a lover. Give love. Choose love. Love everyone, always."
    )
    m3 = ChannelMessage(
        channel_id=1, user_id=3, content="It was Rolling Stones that dubbed me the new king of pop, Michael... I would never usurp the true king!"
    )
    m4 = ChannelMessage(
        channel_id=1, user_id=4, content="I'm telling you, people. Everyday we wake up is another blessing. Follow your dreams and don't let anyone stop you. Never say never."
    )
    m5 = ChannelMessage(
    channel_id=1, user_id=4, content="However, Harry, you'll never be the king of pop..."
    )
    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.add(m4)
    db.session.add(m5)
    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
