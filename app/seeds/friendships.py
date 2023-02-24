from ..models import db, Friendship


friendships = [
    {
        'self_id': 1,
        'friend_id': 2
    },
    {
        'self_id': 1,
        'friend_id': 3
    },
    {
        'self_id': 1,
        'friend_id': 4
    },
    {
        'self_id': 1,
        'friend_id': 5
    },
    {
        'self_id': 2,
        'friend_id': 3
    },
        {
        'self_id': 15,
        'friend_id': 1
    },
            {
        'self_id': 7,
        'friend_id': 8
    },
            {
        'self_id': 9,
        'friend_id': 10
    },
                {
        'self_id': 2,
        'friend_id': 11
    },
                    {
        'self_id': 3,
        'friend_id': 11
    },
                    {
        'self_id': 5,
        'friend_id': 11
    },
                        {
        'self_id': 4,
        'friend_id': 12

    },
                            {
        'self_id': 5,
        'friend_id': 12

    },
                                {
        'self_id': 5,
        'friend_id': 13

    },

                                        {
        'self_id': 6,
        'friend_id': 11

    },
                                        {
        'self_id': 6,
        'friend_id': 10

    },
                                        {
        'self_id': 2,
        'friend_id': 12

    },
                                        {
        'self_id': 4,
        'friend_id': 11

    },
                                    {
        'self_id': 15,
        'friend_id': 13

    },
                                        {
        'self_id': 2,
        'friend_id': 13

    },
                                            {
        'self_id': 3,
        'friend_id': 12

    },
                                                {
        'self_id': 3,
        'friend_id': 6

    },
                                                {
        'self_id': 3,
        'friend_id': 7

    },
                                                    {
        'self_id': 4,
        'friend_id': 7

    },
                                                    {
        'self_id': 5,
        'friend_id': 7

    },
]


def seed_friendships():
    seeder = [Friendship.seed(friendship) for friendship in friendships]
    db.session.add_all(seeder)
    db.session.commit()


def undo_friendships():
    db.session.execute('TRUNCATE friendships RESTART IDENTITY CASCADE;')
    db.session.commit()
