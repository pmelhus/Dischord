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
    channel_id=2, user_id=12, content="You know, I'm a creative genius and there's no other way to word it. https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F375909900127955628%2F&psig=AOvVaw1kNYMEeeMzCwXCNQxmTWR1&ust=1679190222874000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjX9Zqt5P0CFQAAAAAdAAAAABAD "
    )

    m11 = ChannelMessage(
    channel_id=2, user_id=17, content="Listen Kanye... if you're not sincere with it, you shouldn't say anything at all."
    )

    m12 = ChannelMessage(
    channel_id=2, user_id=17, content="https://www.youtube.com/watch?v=_CL6n0FJZpk"
    )

    m13 = ChannelMessage(
    channel_id=2, user_id=15, content="Gotta back up my guy Dre on that, Ye. https://www.youtube.com/watch?v=8GliyDgAGQI"
    )

    m14 = ChannelMessage(
    channel_id=2, user_id=12, content="Listen, I respect y'all. But y'all old now..."
    )

    m15 = ChannelMessage(
    channel_id=2, user_id=12, content="As a man I am flawed, but my music is perfect."
    )

    m16 = ChannelMessage(
    channel_id=2, user_id=12, content="As a man I am flawed, but my music is perfect."
    )

    message_list = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18]

    for message in message_list:
        db.session.add(message)


    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
