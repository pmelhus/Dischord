from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin

@auto_str
class Channel(db.Model, CrUpMixin):
  __tablename__ = "channels"
  id = db.Column(db.Integer, primary_key=True)
  server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)
  name = db.Column(db.String(32), nullable=False)
  description = db.Column(db.String(200))

  # belongs to one
  server = db.relationship("Server", back_populates="channels", lazy="joined")

  # has many
  channel_messages = db.relationship("ChannelMessage", back_populates="channel", cascade="all, delete-orphan", lazy="joined")

  def to_dict(self):
      return {
          'id': self.id,
          'server_id': self.server_id,
          'name': self.name,
          'description': self.description,
          'channel_messages': [channel_message.to_dict() for channel_message in self.channel_messages],
          "created_at": self.created_at,
          "updated_at": self.updated_at
      }

  @staticmethod
  def seed(channel_data):
    channel = Channel()
    channel.server_id = channel_data.get("server_id")
    channel.name = channel_data.get("name")
    channel.description = channel_data.get("description")

    return channel
