from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .creation_mixin import CrUpMixin

from .server_member import server_members
from .inbox_user import inbox_users
from sqlalchemy import and_, or_, not_

class User(db.Model, UserMixin, CrUpMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(190), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    online = db.Column(db.Boolean(), default=False, nullable=True)
    idle = db.Column(db.Boolean(), default=True, nullable=True)




    # has many

    servers = db.relationship("Server", back_populates="owner", cascade="all, delete-orphan", lazy="joined")
    direct_messages = db.relationship("DirectMessage", back_populates="owner", cascade="all, delete-orphan", lazy="joined")
    channel_messages = db.relationship("ChannelMessage", back_populates="owner", cascade="all, delete-orphan", lazy="joined")
    direct_messages = db.relationship("DirectMessage", back_populates="owner", cascade="all, delete-orphan", lazy="joined")

    # many to many

    memberships = db.relationship("Server", back_populates="members", secondary=server_members)
    inbox_memberships = db.relationship("Inbox", back_populates="inbox_members", secondary=inbox_users)


    # belongs to one

    # friend_sender = db.relationship("Friendship", back_populates="user_id_self", uselist=False)
    # friend_receiver = db.relationship("Friendship", back_populates="user_id_friend", uselist=False)



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'image_url': self.image_url,
            'online': self.online,
            'idle': self.idle,
            'created_at': self.created_at,
            'memberships': [server.to_dict() for server in self.memberships],
            'inbox_memberships' : [inbox.to_dict() for inbox in self.inbox_memberships]
        }

    def get_id(self):
        return self.id

    # def get_all_friends(self):
    #     allFriendships = Friendship.query.filter(or_(Friendship.self_id == self.id, Friendship.friend_id == self.id)).all()
    #     friends_list = []
    #     for friendship in allFriendships:
    #         if friendship.self_id == self.id:
    #             friends_list.append(friendship.friend_id)
    #         if friendship.friend_id == self.id:
    #             friends_list.append(friendship.self_id)


    #     return friends_list

    @staticmethod
    def seed(user_data):
        user = User()
        user.username = user_data.get("username")
        user.email = user_data.get("email")
        user.bio = user_data.get("bio")
        user.image_url = user_data.get("image_url")
        user.online = user_data.get('online')
        user.idle = user_data.get('idle')
        return user
