from .db import db
from .creation_mixin import CrUpMixin


class FriendshipRequest(db.Model, CrUpMixin):
    __tablename__ = 'friendship_request'

    id = db.Column(db.Integer, primary_key=True)
    self_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#   user_id_self = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#   user_id_friend = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

#   friend_sender_id = db.relationship("User", foreign_keys=[user_id_self], backref="friend_sender")
#   friend_receiver = db.relationship("User", foreign_keys=[user_id_friend], backref="friend_receiver")

    def to_dict(self):
        return {
            'id': self.id,
            'self_id': self.self_id,
            'friend_id': self.friend_id
        }
