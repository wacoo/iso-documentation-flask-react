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


#Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


user1 = User(first_name='John', middle_name='Doe', last_name='Smith', access_level=1, active=True)
session.add(user1)

cat = Category(name='Criteria')
session.add(cat)

department = Department(name='Engineering')
session.add(department)

file_path = os.path.join('models', 'app.txt')

# Read the binary data from the image file
with open(file_path, 'rb') as file:
    binary_data = file.read()
# Create a new document
document = Document(
    doc_title='Example Document',
    doc_description='This is an example document',
    revision_no=1,
    category_id=cat.id,
    department_id=department.id,
    doc_type='pdf',
    document=binary_data
)

# Add the document to the session
session.add(document)

session.commit()
# Add users to the session
session.close()

# query
all = session.query(Document).all()

for document in all:
    print(document.id, document.doc_title, document.doc_description, document.categories.name)