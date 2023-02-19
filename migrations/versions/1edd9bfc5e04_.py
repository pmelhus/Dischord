"""empty message

Revision ID: 1edd9bfc5e04
Revises: 582175dcf457
Create Date: 2023-02-17 14:06:37.492491

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '1edd9bfc5e04'
down_revision = '582175dcf457'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friendship_requests',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('self_id', sa.Integer(), nullable=False),
    sa.Column('friend_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['self_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('friendships',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('self_id', sa.Integer(), nullable=False),
    sa.Column('friend_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['self_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('friendship')
    op.drop_table('friendship_request')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friendship_request',
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('self_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('friend_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], name='friendship_request_friend_id_fkey'),
    sa.ForeignKeyConstraint(['self_id'], ['users.id'], name='friendship_request_self_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='friendship_request_pkey')
    )
    op.create_table('friendship',
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('self_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('friend_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], name='friendship_friend_id_fkey'),
    sa.ForeignKeyConstraint(['self_id'], ['users.id'], name='friendship_self_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='friendship_pkey')
    )
    op.drop_table('friendships')
    op.drop_table('friendship_requests')
    # ### end Alembic commands ###