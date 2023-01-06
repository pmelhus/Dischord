from .db import db
from datetime import datetime




server_members = db.Table(
  "server_members",
  db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
  db.Column("server_id", db.Integer, db.ForeignKey("servers.id"), primary_key=True),
  db.Column('member_since', db.DateTime, default=datetime.now)
)

