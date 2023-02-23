from .db import db
from .creation_mixin import CrUpMixin
from .user import User


class Friendship(db.Model, CrUpMixin):
    __tablename__ = 'friendships'

    id = db.Column(db.Integer, primary_key=True)
    self_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friend_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

#   user_id_self = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#   user_id_friend = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

#   friend_sender_id = db.relationship("User", foreign_keys=[user_id_self], backref="friend_sender")
#   friend_receiver = db.relationship("User", foreign_keys=[user_id_friend], backref="friend_receiver")

    def to_dict(self):
        return {
            'id': self.id,
            'self_id': self.self_id,
            'friend_id': self.friend_id,

        }

    def return_other_friend(self, id):
        if self.self_id == id:
            user = User.query.get(self.friend_id)
            return user

        if self.friend_id == id:
            user = User.query.get(self.self_id)
            return user
    def return_self_user(self):
        user = User.query.get(self.self_id)
        return user
    def return_friend_user(self):
        user = User.query.get(self.friend_id)
        return user


    @staticmethod
    def seed(friendship_data):
        friendship = Friendship()
        friendship.self_id = friendship_data.get("self_id")
        friendship.friend_id = friendship_data.get("friend_id")
        return friendship
