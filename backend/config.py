from os import getenv, path
from dotenv import load_dotenv

BASE_DIR = path.abspath(path.join(path.dirname(__file__), ".."))  # Ir un nivel arriba
ENV_PATH = path.join(BASE_DIR, ".env")


load_dotenv(ENV_PATH)  # Cargar variables desde .env


class Config:
    SECRET_KEY = '3664atanas'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:3664atanas@db:3306/rigging'
    #SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:3664atanas@rigging_project-db-1:3306/rigging'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuración de Flask-Mail
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = getenv("MAIL_USERNAME")  # Ahora se obtiene desde .env
    MAIL_PASSWORD = getenv("MAIL_PASSWORD")  # Ahora se obtiene desde .env
    MAIL_DEFAULT_SENDER = MAIL_USERNAME  # Usa el mismo correo como remitente

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    # Configuraciones adicionales para producción

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
