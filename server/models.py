import sqlalchemy as db
from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
engine = create_engine('mysql+mysqlconnector://root:vladutcalut123@@localhost:3306/tradingplatform')
Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64))
    email    = db.Column(db.String(64), unique=True, index=True)
    password = db.Column(db.String(128))
    children = relationship("Share")

    def __repr__(self):
        return "<User(id='%s', username='%s', email='%s')>" % (
                                self.id, self.username, self.email)

Base.metadata.create_all(engine)