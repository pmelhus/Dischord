from .db import db

inbox_users = db.Table(
    "inbox_users",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("inbox_id", db.Integer, db.ForeignKey("inboxes.id"), primary_key=True),
)
