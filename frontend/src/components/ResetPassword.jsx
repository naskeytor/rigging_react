import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // 🔹 Capturar el token desde la URL
import { Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = ({setCurrentView}) => {
    const { token } = useParams();  // 🔹 Capturar el token correctamente
    const navigate = useNavigate(); // 🔹 Usar useNavigate para la redirección
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("¡Contraseña actualizada correctamente!");
                setTimeout(() => navigate("/"), 3000);  // 🔹 Redirigir sin recargar
            } else {
                setError(data.error || "Error al actualizar la contraseña.");
            }
        } catch (error) {
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Paper sx={{ padding: 4, width: 400, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Restablecer Contraseña
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {message && <Typography color="primary">{message}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nueva Contraseña"
                        type={showPassword ? "text" : "password"}
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
                    <TextField
                        label="Confirmar Contraseña"
                        type={showConfirmPassword ? "text" : "password"}
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
                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                        Cambiar Contraseña
                    </Button>

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/")}>
                        Cancelar
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ResetPassword;