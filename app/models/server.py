from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin
from .server_member import server_members


@auto_str
class Server(db.Model, CrUpMixin):
    __tablename__ = "servers"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    public = db.Column(db.Boolean(), nullable=False)


    # belongs to one
    owner = db.relationship("User", back_populates="servers", lazy="joined")

    # has many
    channels = db.relationship(
        "Channel", back_populates="server", cascade="all, delete-orphan", lazy="joined")

    # many to many
    members = db.relationship("User", back_populates="memberships", secondary=server_members)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'image_url': self.image_url,
            'public': self.public,
            'channel_ids': [channel.id for channel in self.channels],
            'members_ids': [member.id for member in self.members]
        }

    @staticmethod
    def seed(server_data):
        server = Server()
        server.owner_id = server_data.get("owner_id")
        server.name = server_data.get("name")
        server.image_url = server_data.get("image_url")
        server.public = server_data.get("public")

        return server
