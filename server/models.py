import sqlalchemy as db
from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
engine = create_engine('mysql+mysqlconnector://root:vladutcalut123@@localhost:3306/fidelity')
Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id              = db.Column(db.Integer, primary_key=True)
    full_name       = db.Column(db.String(64))
    username        = db.Column(db.String(64))
    password        = db.Column(db.String(64))
    email           = db.Column(db.String(64), unique=True, index=True)
    phone_number    = db.Column(db.String(64))
    date_of_birth   = db.Column(Date)
    Key             = db.Column(db.String(64))

    def __repr__(self):
        return "<User(id='%s', password='%s', username='%s', email='%s', phone_number='%s', date_of_birth='%s')>" % (
                                self.id, self.password, self.username, self.email, self.phone_number, self.date_of_birth)

class UserRegistration(Base):
    __tablename__ = 'user_registration'
    id              = db.Column(db.Integer, primary_key=True)
    user_id         = db.Column(db.Integer, ForeignKey('user.id'))
    Key             = db.Column(db.String(6))
    emailsenttime   = db.Column(db.DateTime)

    def __repr__(self):
        return "<User(id='%s', user_id='%s', Key='%s')>" % (
                                self.id, self.user_id, self.Key)

Base.metadata.create_all(engine)