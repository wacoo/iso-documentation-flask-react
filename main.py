import sys
import os

from models.base import Base, engine
from models.users import User
from models.timestamps import Timestamp
from sqlalchemy.orm import sessionmaker

project_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(project_path)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


user1 = User(first_name='John', middle_name='Doe', last_name='Smith', access_level=1, active=True)
timestamp1 = Timestamp(user_id=user1.id)
user1.timestamps.append(timestamp1)

# Add users to the session
try:
    with session.begin():
        session.add(user1)
        session.flush()

        session.add(timestamp1)
        session.commit()
except Exception as e:
    session.rollback()
    raise e
finally:
    session.close()
