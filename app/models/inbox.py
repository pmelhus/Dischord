from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin
from .inbox_user import inbox_users

@auto_str
class Inbox(db.Model, CrUpMixin):
  __tablename__ = "inboxes"
  id = db.Column(db.Integer, primary_key=True)

  # belongs to
  direct_message = db.relationship("DirectMessage", back_populates='inboxes', lazy='joined')

  # many to many

  inbox_members = db.relationship("User", back_populates="dm_members", secondary=inbox_users)

  def to_dict(self):
    return {
      "id": self.id
    }
