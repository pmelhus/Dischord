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
        members = db.session.query(server_members).all()
        def filter_members(member):
            return True if member.server_id == self.id else False
        this_server_members = filter(filter_members, members)
        # for i in this_server_members:
            # print(i, self.members, '===========HERE==============')
        memberListWithDate = []
        def insert_row_to_dict_list(this_server_members):
            for member in this_server_members:
                d = {"user_id": member.user_id, "server_id":member.server_id, "member_since": member.member_since}
                memberListWithDate.append(d)
                #  print(d, '===========HERE==============')you
        insert_row_to_dict_list(this_server_members)
        return {
        'id': self.id,
        'owner_id': self.owner_id,
        'name': self.name,
        'image_url': self.image_url,
        'public': self.public,
        'channel_ids': [channel.id for channel in self.channels],
        'members_ids': memberListWithDate
        }

    @staticmethod
    def seed(server_data):
        server = Server()
        server.owner_id = server_data.get("owner_id")
        server.name = server_data.get("name")
        server.image_url = server_data.get("image_url")
        server.public = server_data.get("public")

        return server
