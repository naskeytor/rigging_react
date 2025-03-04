from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy.session import Session
from backend.extensions import db, migrate, mail
from flask_login import LoginManager
from backend.models.models import User
from backend.config import DevelopmentConfig

from backend.context_processors import (inject_rigging_types, inject_rigs, inject_rigging_sizes, inject_manufacturers,
                                        inject_rigging, inject_rigging_components, inject_component_processor)
import mysql.connector
from mysql.connector import errorcode



def create_app():
    app = Flask(__name__)
    app.secret_key = '3664atanas'
    app.config.from_object(DevelopmentConfig)
    Session(app)

    CORS(app, resources={r"/api/*": {"origins": ["https://localhost:5173", "https://127.0.0.1:5173"]
                                 }}, supports_credentials=True)
    from backend.blueprints.auth.routes import auth_bp
    # Registrar el blueprint bajo "/api"
    app.register_blueprint(auth_bp, url_prefix="/api")

    # Crear base de datos si no existe
    db_name = app.config['SQLALCHEMY_DATABASE_URI'].rsplit('/', 1)[-1]
    db_uri = app.config['SQLALCHEMY_DATABASE_URI'].rsplit('/', 1)[0] + "/mysql"
    try:
        cnx = mysql.connector.connect(user='root', password='3664atanas', host='db')  # Cambiado de 'localhost' a 'db'
        cursor = cnx.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
        cnx.commit()
        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    except Exception as e:
        print(f"An error occurred: {e}")

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_message = None  # ⬅️ Desactiva el mensaje de login
    login_manager.login_view = None  # ⬅️ Evita redirecciones automáticas

    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        user = User.query.get(int(user_id))
        db.session.refresh(user)  # Asegura que los roles se cargan correctamente
        return user

    from backend.blueprints.components.routes import components_bp
    from backend.blueprints.rigs.routes import rigs_bp
    from backend.blueprints.rigging.routes import rigging_bp
    from backend.blueprints.manufacturers.routes import manufacturers_bp
    from backend.blueprints.sizes.routes import sizes_bp
    from backend.blueprints.statuses.routes import statuses_bp
    from backend.blueprints.component_types.routes import component_types_bp
    from backend.blueprints.models.routes import models_bp
    from backend.blueprints.main.routes import main_bp
    from backend.blueprints.auth.routes import auth_bp

    # app.register_blueprint(auth_bp)
    app.register_blueprint(components_bp)
    app.register_blueprint(rigs_bp)
    app.register_blueprint(rigging_bp)
    app.register_blueprint(manufacturers_bp)
    app.register_blueprint(sizes_bp)
    app.register_blueprint(statuses_bp)
    app.register_blueprint(component_types_bp)
    app.register_blueprint(models_bp)
    app.register_blueprint(main_bp)

    app.context_processor(inject_rigging)
    app.context_processor(inject_rigging_types)
    app.context_processor(inject_rigging_components)
    app.context_processor(inject_rigs)
    app.context_processor(inject_component_processor)
    app.context_processor(inject_rigging_sizes)
    app.context_processor(inject_manufacturers)

    @app.route('/')
    def index():
        return jsonify({"message": "Bienvenido a la API de Flask 🚀"})  # Cambiado de render_template a JSON

    return app

