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

    m6 = ChannelMessage(
    channel_id=1, user_id=2, content="https://media.giphy.com/media/guufsF0Az3Lpu/giphy.gif "
    )

    m7 = ChannelMessage(
    channel_id=1, user_id=3, content="Honestly, I get it J... hard to compete with this...  https://media.giphy.com/media/yZX06xrr41RNS/giphy.gif"
    )

    m8 = ChannelMessage(
    channel_id=1, user_id=5, content="If MJ's the king of pop, I'm definitely the QUEEN of pop! https://www.youtube.com/watch?v=b1kbLwvqugk&ab_channel=TaylorSwiftVEVO"
    )

    m9 = ChannelMessage(
    channel_id=1, user_id=6, content="Excuse me? https://media.giphy.com/media/saJ4Lt12dUmPucCrDh/giphy.gif"
    )


    m10 = ChannelMessage(
    channel_id=1, user_id=12, content="You know, I'm a creative genius and there's no other way to word it."
    )

    m11 = ChannelMessage(
    channel_id=1, user_id=12, content="You know, I'm a creative genius and there's no other way to word it."
    )

    message_list = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11]

    for message in message_list:
        db.session.add(message)


    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
