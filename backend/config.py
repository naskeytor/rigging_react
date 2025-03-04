import os
from os import getenv, path
from dotenv import load_dotenv
import sys

sys.path.append('/usr/local/lib/python3.9/site-packages')

BASE_DIR = path.abspath(path.join(path.dirname(__file__), ".."))  # Ir un nivel arriba
ENV_PATH = path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)  # Cargar variables desde .env


class Config:
    SECRET_KEY = '3664atanas'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:3664atanas@db:3306/rigging'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuración de sesiones y cookies con HTTPS
    SESSION_COOKIE_NAME = "session"
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_SECURE = True  # 🔴 Asegurar que las cookies solo viajen por HTTPS
    SESSION_COOKIE_HTTPONLY = True
    SESSION_PERMANENT = True
    SESSION_TYPE = "filesystem"  # ⬅️ Usar almacenamiento de sesiones en archivos
    SESSION_USE_SIGNER = True
    SESSION_FILE_DIR = "/tmp/flask_sessions"

    REMEMBER_COOKIE_SAMESITE = "None"
    REMEMBER_COOKIE_SECURE = True  # 🔴 Importante para HTTPS
    REMEMBER_COOKIE_HTTPONLY = True

    # Configuración de Flask-Mail
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = getenv("MAIL_USERNAME")  # Ahora se obtiene desde .env
    MAIL_PASSWORD = getenv("MAIL_PASSWORD")  # Ahora se obtiene desde .env
    MAIL_DEFAULT_SENDER = MAIL_USERNAME  # Usa el mismo correo como remitente

    # 🔴 Reconocer que Flask está detrás de un proxy reverso (Nginx)
    PREFERRED_URL_SCHEME = "https"
    USE_X_SENDFILE = True


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    SESSION_COOKIE_SECURE = True  # 🔴 Asegurar HTTPS en producción
    REMEMBER_COOKIE_SECURE = True
    PREFERRED_URL_SCHEME = "https"


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'