class Config:
    SECRET_KEY = '3664atanas'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:3664atanas@db:3306/rigging'
    #SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:3664atanas@rigging_project-db-1:3306/rigging'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    # Configuraciones adicionales para producción

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
