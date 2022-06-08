from .db import db, auto_str
from .creation_mixin import CrUpMixin

@auto_str
class ChannelMessage(db.Model, CrUpMixin):
  __tablename__ = 'channel_messages'

  id = db.Column(db.Integer, primary_key=True)
  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  content = db.Column(db.Text, nullable=False)
  edited = db.Column(db.Boolean())

  # belongs to one
  owner = db.relationship("User", back_populates="channel_messages", lazy="joined")
  channel = db.relationship("Channel", back_populates="channel_messages", lazy="joined")

  def to_dict(self):
    return {
      'id': self.id,
      'channel_id': self.channel_id,
      'user_id': self.user_id,
      'content': self.content,
      'edited': self.edited
    }

  @staticmethod
  def seed(channel_message_data):
    channel_message = ChannelMessage()
    channel_message.channel_id = channel_message_data.get("channel_id")
    channel_message.user_id = channel_message_data.get("user_id")
    channel_message.content = channel_message_data.get("content")
    channel_message.edited = channel_message_data.get("edited")
    return channel_message
