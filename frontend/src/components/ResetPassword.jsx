import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // ⬇️ Limpiar contraseñas cuando se monta y desmonta el componente
    useEffect(() => {
        setPassword("");
        setConfirmPassword("");

        return () => {
            setPassword("");
            setConfirmPassword("");
        };
    }, []);

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
                setTimeout(() => navigate("/"), 3000);
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
                        autoComplete="new-password" // 🔹 Evita autocompletado
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
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
                        autoComplete="new-password" // 🔹 Evita autocompletado
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" aria-label="toggle confirm password visibility">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>
                        Cambiar Contraseña
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ResetPassword;
