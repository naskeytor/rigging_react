from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from backend.models.models import User, Role
from backend.extensions import db, mail
from flask_cors import CORS
import secrets
from flask_mail import Mail, Message  # Necesitas configurar Flask-Mail


auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Verificar si el usuario ya existe
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "El usuario ya existe"}), 400

    # Crear nuevo usuario
    user = User(username=username, email=email)
    user.set_password(password)

    # Asignar rol por defecto (si no existe, crearlo)
    role = Role.query.filter_by(name="user").first()
    if not role:
        role = Role(name="user")
        db.session.add(role)
        db.session.commit()

    user.roles.append(role)
    db.session.add(user)
    db.session.commit()

    # Devolver respuesta en formato JSON
    return jsonify({
        "message": "Registro exitoso",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": [role.name for role in user.roles]  # Lista de roles del usuario
        }
    }), 201  # 201 = Created


@auth_bp.route('/login', methods=['POST'])
def login():
    print("🔹 Entrando en la función login()")  # 👈 Verificar si Flask entra aquí
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(f"🔹 Datos recibidos - Usuario: {username}, Password: {password}")

    user = User.query.filter_by(username=username).first()
    if user:
        print(f"🔹 Usuario encontrado en la base de datos: {user.username}")
    else:
        print("🔹 Usuario no encontrado")

    if user and user.check_password(password):
        db.session.refresh(user)  # Asegurar que los roles se cargan correctamente
        login_user(user)
        roles = [role.name for role in user.roles]
        print(
            f"🔹 Usuario {user.username} ha iniciado sesión con roles: {[role.name for role in user.roles]}")  # 👈 Forzar impresión
        return jsonify({
            "message": "Login exitoso",
            "role": roles  # Devuelve lista de roles
        })

    print("🔹 Credenciales incorrectas")
    return jsonify({"message": "Usuario o contraseña incorrectos"}), 401


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Generar un token de restablecimiento de contraseña
    reset_token = secrets.token_hex(16)
    user.reset_token = reset_token  # Guardamos el token en la base de datos
    db.session.commit()

    # Definir el dominio público donde estará el frontend
    FRONTEND_URL = "http://127.0.0.1:5173"  # ⚠️ Cambia esto si tu frontend está en otro dominio

    # Crear la URL de restablecimiento de contraseña
    reset_url = f"{FRONTEND_URL}/reset-password/{reset_token}"  # URL correcta para React

    # Enviar el correo con el enlace de restablecimiento
    msg = Message("Restablecimiento de Contraseña", recipients=[email])
    msg.body = f"Haz clic en el siguiente enlace para restablecer tu contraseña: {reset_url}\nSi no solicitaste esto, ignora este mensaje."

    try:
        mail.send(msg)
        return jsonify({"message": "Se ha enviado un enlace de restablecimiento a tu correo electrónico."}), 200
    except Exception as e:
        return jsonify({"error": "Error al enviar el correo", "details": str(e)}), 500


@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    new_password = data.get("password")

    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    user = User.query.filter_by(reset_token=token).first()
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 400

    # Cambiar la contraseña del usuario
    user.set_password(new_password)
    user.reset_token = None  # Limpiar el token después de usarlo
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada correctamente"}), 200



@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))


@auth_bp.route('/user', methods=['GET'])
@login_required
def get_user():
    return jsonify({
        "username": current_user.username,
        "roles": [role.name for role in current_user.roles]
    })


@auth_bp.route('/admin')
@login_required
def admin_dashboard():
    if not current_user.is_admin():
        return jsonify({"error": "Acceso denegado"}), 403
    return render_template('admin_dashboard.html')
