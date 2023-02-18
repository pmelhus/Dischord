from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin
from .inbox_user import inbox_users
from app.utils.uuid_creator import generate_uuid

@auto_str
class Inbox(db.Model, CrUpMixin):
  __tablename__ = "inboxes"
  id = db.Column(db.Integer, primary_key=True)
  dm_uuid = db.Column(db.String(100), nullable=False)

  # belongs to
  direct_message = db.relationship("DirectMessage", back_populates='inbox', lazy='joined')

  # many to many

  inbox_members = db.relationship("User", back_populates="inbox_memberships", secondary=inbox_users)


  def to_dict(self):
    return {
      "id": self.id,
      "uuid": self.dm_uuid,
      "inbox_members": [member.id for member in self.inbox_members]
    }

  @staticmethod
  def seed(inbox_data):
      inbox = Inbox()
      inbox.dm_uuid = inbox_data.get("dm_uuid")
      return inbox
