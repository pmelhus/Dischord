"""empty message

Revision ID: 582175dcf457
Revises: f5ac982fe546
Create Date: 2023-02-16 17:16:54.512729

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '582175dcf457'
down_revision = 'f5ac982fe546'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('friendship', 'dm_uuid')
    op.add_column('inboxes', sa.Column('dm_uuid', sa.String(length=100), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('inboxes', 'dm_uuid')
    op.add_column('friendship', sa.Column('dm_uuid', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
