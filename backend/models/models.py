from datetime import date, datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Table, Column, Integer, String, ForeignKey, Date, Text
from sqlalchemy.orm import relationship
from backend.extensions import db

# Tabla de asociación para la relación muchos a muchos entre User y Role
user_roles = Table('user_roles', db.Model.metadata,  # Usando la metadata central de db.Model
    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('role_id', Integer, ForeignKey('role.id'), primary_key=True),
    extend_existing=True
)

# Tabla de asociación para la relación muchos a muchos entre Rig y Component
rig_component_association = db.Table('rig_component_association', db.Model.metadata,
    Column('rig_id', Integer, ForeignKey('rig.id'), primary_key=True),
    Column('component_id', Integer, ForeignKey('component.id'), primary_key=True),
    extend_existing=True
)

class Role(db.Model):
    __tablename__ = 'role'  # Definir nombre de tabla explícitamente
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(80), unique=True)

    def __repr__(self):
        return f'<Role {self.name}>'

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    username = db.Column(String(100), unique=True, nullable=False)
    email = db.Column(String(120), unique=True, nullable=False)
    password_hash = db.Column(String(255))
    roles = relationship('Role', secondary=user_roles, backref=db.backref('users', lazy='dynamic'))
    reset_token = db.Column(db.String(64), unique=True, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_admin(self):
        print(f"Roles de {self.username}: {[role.name for role in self.roles]}")
        return any(role.name == 'admin' for role in self.roles)

    def has_role(self, role_name):
        return any(role.name == role_name for role in self.roles)

    def __repr__(self):
        return f'{self.username}'

class Manufacturer(db.Model):
    __tablename__ = 'manufacturer'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    manufacturer = db.Column(String(50), nullable=False)

    def __repr__(self):
        return f'{self.manufacturer}'

class Size(db.Model):
    __tablename__ = 'size'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    size = db.Column(String(50), nullable=True)
    components = relationship('Component', back_populates='sizes')

    def __repr__(self):
        return f'{self.size}'

class Status(db.Model):
    __tablename__ = 'status'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    status = db.Column(String(50), nullable=False)
    components = relationship('Component', backref='status', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'{self.status}'

class ComponentType(db.Model):
    __tablename__ = 'component_type'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    component_type = db.Column(String(50), nullable=False)
    components = relationship('Component', back_populates='component_type', lazy=True)

    def __repr__(self):
        return f'{self.component_type}'

class Model(db.Model):
    __tablename__ = 'model'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    model = db.Column(String(50), nullable=False)
    manufacturer_id = db.Column(Integer, ForeignKey('manufacturer.id'), nullable=False)
    manufacturer = relationship('Manufacturer', backref=db.backref('models', lazy=True, cascade="all, delete-orphan"))

    def __repr__(self):
        return f'{self.model}'

class Component(db.Model):
    __tablename__ = 'component'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    component_type_id = db.Column(Integer, ForeignKey('component_type.id'), nullable=False)
    component_type = relationship('ComponentType', back_populates='components')
    model_id = db.Column(Integer, ForeignKey('model.id'), nullable=True)
    model = relationship('Model', backref='components')
    serial_number = db.Column(String(50), nullable=False)
    dom = db.Column(Date, default=date.today, nullable=False)
    size_id = db.Column(Integer, ForeignKey('size.id'), nullable=True)
    sizes = relationship('Size', back_populates='components')
    status_id = db.Column(Integer, ForeignKey('status.id'), nullable=True)
    rigs = relationship('Rig', secondary=rig_component_association, back_populates="components")
    jumps = db.Column(Integer, nullable=False, default=0)
    aad_jumps_on_mount = db.Column(Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<Component {self.serial_number}>'

class Rig(db.Model):
    __tablename__ = 'rig'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    rig_number = db.Column(String(10), nullable=False)
    components = relationship('Component', secondary=rig_component_association, back_populates="rigs")
    current_aad_jumps = db.Column(Integer, nullable=False, default=0)

    @property
    def canopy(self):
        for component in self.components:
            if component.component_type.component_type == 'Canopy':
                return component
        return None

    @property
    def container(self):
        for component in self.components:
            if component.component_type.component_type == 'Container':
                return component
        return None

    @property
    def reserve(self):
        for component in self.components:
            if component.component_type.component_type == 'Reserve':
                return component
        return None

    @property
    def aad(self):
        for component in self.components:
            if component.component_type.component_type == 'Aad':
                return component
        return None

    def __repr__(self):
        return f'<Rig {self.rig_number}>'

class RiggingType(db.Model):
    __tablename__ = 'rigging_type'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(255), nullable=False)
    description = db.Column(String(255))

    def __repr__(self):
        return f'{self.name}'

class Rigging(db.Model):
    __tablename__ = 'rigging'
    __table_args__ = {'extend_existing': True}
    id = db.Column(Integer, primary_key=True)
    date = db.Column(Date, nullable=False, default=datetime.utcnow)
    serial_numbers = db.Column(String(255), nullable=False)
    description = db.Column(Text, nullable=True)
    rigger_id = db.Column(Integer, ForeignKey('user.id'), nullable=True)
    rigger = relationship('User', backref='riggings')
    rig_id = db.Column(Integer, ForeignKey('rig.id'), nullable=True)
    component_id = db.Column(Integer, ForeignKey('component.id'), nullable=True)
    component = relationship('Component', backref='riggings')
    type_rigging_id = db.Column(Integer, ForeignKey('rigging_type.id'), nullable=False)
    type_rigging = relationship('RiggingType', backref='riggings')

    def __repr__(self):
        return f'<Rigging {self.id} on {self.date}>'