import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = ({ setCurrentView }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro.");
            }

            setMessage("¡Registro exitoso! Redirigiendo...");
            setTimeout(() => setCurrentView("login"), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Paper elevation={10} sx={{ padding: 4, width: 350, textAlign: "center", borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold">Registro</Typography>

                {error && <Typography color="error">{error}</Typography>}
                {message && <Typography color="primary">{message}</Typography>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* 🔹 Campo de contraseña con icono para mostrar/ocultar */}
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}  // 🔹 Cambia entre "text" y "password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />

                    {/* 🔹 Campo de confirmación de contraseña con icono */}
                    <TextField
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}  // 🔹 Cambia entre "text" y "password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Registrarse
                    </Button>

                    {/* 🔹 Botón Cancelar */}
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setCurrentView("login")}>
                        Cancelar
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;