import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";

const ResetPassword = () => {
    const {token} = useParams(); // Captura el token desde la URL
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({password}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("¡Contraseña actualizada correctamente!");
                setTimeout(() => navigate("/"), 3000); // Redirige al login después de 3s
            } else {
                setError(data.error || "Error al actualizar la contraseña.");
            }
        } catch (error) {
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
            <Paper sx={{padding: 4, width: 400, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>
                    Restablecer Contraseña
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {message && <Typography color="primary">{message}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nueva Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirmar Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Cambiar Contraseña
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ResetPassword;