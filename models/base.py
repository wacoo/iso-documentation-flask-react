from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

from sqlalchemy import engine
Base = declarative_base()
# engine = create_engine('mysql+pymysql://root:root@localhost:3306/iso_db?', echo=True)
# engine = create_engine('postgresql://postgres:postgres@localhost:5432/iso_db')
engine = create_engine('mssql+pyodbc://sa@localhost\\SQL2019/iso_db?driver=ODBC+Driver+18+for+SQL+Server&trusted_connection=yes&TrustServerCertificate=yes')
