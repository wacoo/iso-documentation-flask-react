import sys
import os

from models.base import Base, engine
from models.categories import Category
from models.deparments import Department
from models.users import User
from models.documents import Document
from sqlalchemy.orm import sessionmaker

project_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(project_path)


Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


user1 = User(username='2254', password='123', first_name='Wondmagegn', middle_name='Abriham', last_name='Chosha', access_level=1, active=True)
session.add(user1)
session.commit()

user2 = User(username='2256', password='123', first_name='Sisay', middle_name='Gizachew', last_name='Sidelil', access_level=1, active=True)
session.add(user2)
session.commit()

cat1 = Category(name='Procedure')
session.add(cat1)

cat2 = Category(name='Criteria')
session.add(cat2)


cat3 = Category(name='Manual')
session.add(cat3)

department = Department(name='Quality')
session.add(department)

department2 = Department(name='ICT')
session.add(department2)

department3 = Department(name='HR')
session.add(department3)

file_path = os.path.join('models', 'app.txt')

# Read the binary data from the image file
with open(file_path, 'rb') as file:
    binary_data = file.read()
# Create a new document
document = Document(
    doc_title='Digital transformation',
    doc_description='This is an example document',
    revision_no=1,
    category_id=cat1.id,
    department_id=department.id,
    doc_type='txt',
    document=binary_data
)

# Add the document to the session
session.add(document)

document2 = Document(
    doc_title='RICOH Manual',
    doc_description='This is an example document',
    revision_no=1,
    category_id=cat3.id,
    department_id=department2.id,
    doc_type='txt',
    document=binary_data
)

# Add the document to the session
session.add(document2)

document3 = Document(
    doc_title='Marketing procedure',
    doc_description='This is an example document',
    revision_no=1,
    category_id=cat1.id,
    department_id=department.id,
    doc_type='txt',
    document=binary_data
)

# Add the document to the session
session.add(document3)

session.commit()
# Add users to the session
session.close()

# query
all = session.query(Document).all()

for document in all:
    print(document.id, document.doc_title, document.doc_description, document.category.name)