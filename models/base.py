from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()
engine = create_engine('mysql+pymysql://root:root@localhost:3306/iso_db', echo=True)
# engine = create_engine('postgresql://postgres:postgres@localhost:5432/iso_db')
# engine = create_engine('mssql+pyodbc://administrator:fakepwd@localhost:1433/iso_db')