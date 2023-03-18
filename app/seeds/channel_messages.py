from app.models import db, ChannelMessage

def seed_channel_messages():
    m1 = ChannelMessage(
        channel_id=1, user_id=2, content="I am starting with the man in the mirror. And that's me, the king of pop! Get out of here Harry Styles. HEE HEE!"
    )

    m2 = ChannelMessage(
        channel_id=1, user_id=3, content="Be a lover. Give love. Choose love. Love everyone, always"
    )
    m3 = ChannelMessage(
        channel_id=1, user_id=3, content="It was Rolling Stones that dubbed me the new king of pop, Michael... I would never usurp the true king!"
    )
    m4 = ChannelMessage(
        channel_id=1, user_id=4, content="I'm telling you, people. Everyday we wake up is another blessing. Follow your dreams and don't let anyone stop you. Never say never"
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
    channel_id=2, user_id=12, content="You know, I'm a creative genius and there's no other way to word it https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjEwNmRkZjJiODI3ZGI2ZmI4NjAwYzZlOGIxNzE2NDhkY2MyMWI5MiZjdD1n/SX5MzFdz6Nh6g/giphy.gif"
    )

    m11 = ChannelMessage(
    channel_id=2, user_id=17, content="Listen Kanye... if you're not sincere with it, you shouldn't say anything at all"
    )

    m12 = ChannelMessage(
    channel_id=2, user_id=17, content="https://i.gifer.com/5ytn.gif"
    )

    m13 = ChannelMessage(
    channel_id=2, user_id=15, content="Gotta back up my guy Dre on that, Ye"
    )

    m14 = ChannelMessage(
    channel_id=2, user_id=12, content="Listen, I respect y'all. But y'all old now..."
    )

    m15 = ChannelMessage(
    channel_id=2, user_id=12, content="As a man I am flawed, but my music is perfect"
    )

    m16 = ChannelMessage(
    channel_id=2, user_id=12, content="https://www.youtube.com/watch?v=MYF7H_fpc-g&t=2s"
    )

    m17 = ChannelMessage(
    channel_id=2, user_id=13, content="Listen Kanye, I love you man but you gotta cool it... If Beyonce taught me anything it was that even someone as great as me can be put in his place"
    )

    m18 = ChannelMessage(
    channel_id=2, user_id=6, content="Did someone say my name? https://media.tenor.com/DPyfbUcI5CgAAAAC/beyonce-saymyname.gif"
    )

    m19 = ChannelMessage(
    channel_id=2, user_id=6, content="J baby, don't forget what I did on Lemonade"
    )

    m20 = ChannelMessage(
    channel_id=2, user_id=13, content="Don't worry Bey, I learned my lesson"
    )

    m21 = ChannelMessage(
    channel_id=2, user_id=14, content="This is getting awkward, y'all..."
    )

    m22 = ChannelMessage(
    channel_id=2, user_id=10, content="Yeah for real. I usually leave the deep stuff for my music"
    )

    m23 = ChannelMessage(
    channel_id=2, user_id=10, content="https://assets.vogue.com/photos/5891c792ce34fb453af7d194/master/w_1600,c_limit/drake-memes.gif"
    )

    m24 = ChannelMessage(
    channel_id=2, user_id=10, content="I was born to make mistakes, not to fake perfection"
    )

    m25 = ChannelMessage(
    channel_id=2, user_id=14, content="Amen, Drizzy... It's easy to forget who you are"
    )

    m26 = ChannelMessage(
        channel_id=2, user_id=11, content="I feel you on that, Beyonce... Trust is hard to come by. That’s why my circle is small and tight. I’m kind of funny about making new friends."
    )

    message_list = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26]

    for message in message_list:
        db.session.add(message)


    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
