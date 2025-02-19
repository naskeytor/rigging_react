import React, { useState } from "react";
import { login } from "./api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(username, password);

        console.log("🔹 Valor original de response.role:", response.role);
        console.log("🔹 JSON.stringify(response.role):", JSON.stringify(response.role));

        // 🔴 Normalizar eliminando espacios
        const rolesArray = response.role.map(role => role.trim());

        console.log("🔹 Valor corregido de response.role:", rolesArray);
        console.log("🔹 JSON.stringify(rolesArray):", JSON.stringify(rolesArray));


        if (response.message === "Login exitoso") {
            if (rolesArray.some(role => role === "admin")) {
                console.log("🔹 Redirigiendo a /admin-dashboard");  // ✅ Depurar redirección
                navigate("/admin-dashboard");
            } else if (rolesArray.some(role => role === "rigger")) {
                console.log("🔹 Redirigiendo a /rigger-dashboard");
                navigate("/rigger-dashboard");
            } else {
                console.log("🔹 Redirigiendo a /user-dashboard");
                navigate("/user-dashboard");
            }
        } else {
            setError(response.message);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
