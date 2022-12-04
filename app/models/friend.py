from .db import db
from .creation_mixin import CrUpMixin

class Friend(db.Model, CrUpMixin):
  __tablename__ = 'friends'

  id = db.Column(db.Integer, primary_key=True)
  user_id_self = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  user_id_friend = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  friend_sender_id = db.relationship("User", foreign_keys=[user_id_self], backref="friend_sender")
  friend_receiver = db.relationship("User", foreign_keys=[user_id_friend], backref="friend_receiver")

  def to_dict(self):
      return {
          'id': self.id,
          'user_id_self': self.user_id_self,
          'user_id_friend': self.user_id_friend,
          'friend_sender_id': self.friend_sender_id.to_dict(),
          'friend_receiver_id': self.friend_receiver.id.to_dict()
          # 'memberships': [server.to_dict() for server in self.memberships]
      }
