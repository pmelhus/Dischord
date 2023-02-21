from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin


@auto_str
class DirectMessage(db.Model, CrUpMixin):
    __tablename__ = "direct_messages"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    inbox_id = db.Column(db.Integer, db.ForeignKey(
        "inboxes.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    edited = db.Column(db.Boolean)

    # belongs to one
    inbox = db.relationship(
        "Inbox", back_populates="direct_message", lazy="joined")

    # belongs to many
    owner = db.relationship(
        "User", back_populates="direct_messages", lazy="joined")

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "inbox_id": self.inbox_id,
            "content": self.content,
            "edited": self.edited,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def seed(direct_message_data):
        direct_message = DirectMessage()
        direct_message.owner_id = direct_message_data.get('owner_id')
        direct_message.inbox_id = direct_message_data.get('inbox_id')
        direct_message.content = direct_message_data.get('content')
        direct_message.edited = direct_message_data.get('edited')
        return direct_message
