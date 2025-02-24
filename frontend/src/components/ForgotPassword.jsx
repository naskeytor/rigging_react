import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";

const ForgotPassword = ({setCurrentView}) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/api/forgot-password", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
                setTimeout(() => navigate("/"), 5000); // Redirige al login después de 5s
            } else {
                setError(data.error || "Error al procesar la solicitud.");
            }
        } catch (error) {
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
            <Paper sx={{padding: 4, width: 400, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>
                    Recuperar Contraseña
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {message && <Typography color="primary">{message}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Correo Electrónico"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Enviar Enlace
                    </Button>
                    <Button variant="contained" color="primary" fullWidth sx={{mt: 2}}
                            onClick={() => setCurrentView("login")}>
                        Cancelar
                    </Button>

                </form>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
