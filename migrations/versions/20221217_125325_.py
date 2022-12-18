"""empty message

Revision ID: 80471a47cc8a
Revises: f0312ea9958a
Create Date: 2022-12-17 12:53:25.009454

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '80471a47cc8a'
down_revision = 'f0312ea9958a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('inactive', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'inactive')
    # ### end Alembic commands ###
