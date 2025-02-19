import React, { useState } from "react";
import { login } from "./api";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister) {
            // Implementar función de registro en backend
            console.log("🔹 Registro aún no implementado");
        } else {
            const response = await login(username, password);
            if (response.message === "Login exitoso") {
                if (response.role.includes("admin")) {
                    navigate("/admin-dashboard");
                } else if (response.role.includes("rigger")) {
                    navigate("/rigger-dashboard");
                } else {
                    navigate("/user-dashboard");
                }
            } else {
                setError(response.message);
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        className="w-full px-4 py-2 border rounded-md mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {isRegister && (
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            className="w-full px-4 py-2 border rounded-md mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border rounded-md mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                        {isRegister ? "Registrarse" : "Ingresar"}
                    </button>
                </form>

                <p className="text-center mt-4">
                    {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}
                    <button
                        className="text-blue-500 hover:underline ml-1"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? "Inicia Sesión" : "Regístrate"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;