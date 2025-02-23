import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    TextField,
    Link,
    InputAdornment,
    IconButton
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // 🔹 Limpiar formulario al montar y desmontar el componente
    useEffect(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        return () => {
            setUsername("");
            setEmail("");
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
            const response = await fetch("http://127.0.0.1:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro");
            }

            setMessage("¡Registro exitoso! Redirigiendo...");
            setTimeout(() => navigate("/"), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box>
            <Paper elevation={10} sx={{ padding: 4, height: '80vh', width: 320, margin: '20px auto' }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ backgroundColor: '#374249', color: 'white' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">Sign up</Typography>
                </Box>

                {/* Espaciado adicional entre "Sign up" y los campos */}
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Username"
                        placeholder="Enter username"
                        fullWidth
                        required
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Email"
                        placeholder="Enter email"
                        fullWidth
                        required
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        label="Password"
                        placeholder="Enter password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        required
                        autoComplete="new-password"
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
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        label="Confirm Password"
                        placeholder="Confirm password"
                        type={showConfirmPassword ? "text" : "password"}
                        fullWidth
                        required
                        autoComplete="new-password"
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
                        sx={{ mt: 2 }}
                    />
                </Box>

                {error && (
                    <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
                        {error}
                    </Typography>
                )}

                {message && (
                    <Typography color="primary" sx={{ textAlign: "center", mt: 1 }}>
                        {message}
                    </Typography>
                )}

                {/* Espaciado entre el botón y los enlaces */}
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 3, backgroundColor: '#374249' }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Sign up
                </Button>

                <Typography sx={{ mt: 2 }}>
                    Already have an account? <Link href="/login">Sign in</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;