import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Checkbox,
    Typography,
    Button,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Link,
    InputAdornment,
    IconButton
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUsername("");
        setPassword("");

        return () => {
            setUsername("");
            setPassword("");
        };
    }, []);

    const handleLogin = async () => {
        setError("");
        try {
            const response = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            const userRole = Array.isArray(data.role) ? data.role[0] : data.role;
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", userRole);

            switch (userRole) {
                case "admin": navigate("/admin"); break;
                case "rigger": navigate("/rigger"); break;
                case "user": navigate("/user"); break;
                default: setError("Rol desconocido");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box>
            <Paper elevation={10} sx={{ padding: 4, height: '70vh', width: 280, margin: '20px auto' }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ backgroundColor: '#374249', color: 'white' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">Sign in</Typography>
                </Box>

                {/* Espaciado adicional entre "Sign in" y "Username" */}
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
                        sx={{ mt: 2 }} // Espaciado entre los inputs
                    />
                </Box>

                <FormControlLabel
                    label="Remember me"
                    control={<Checkbox name="checked" color="primary" />}
                    sx={{ mt: 2 }}
                />

                {error && (
                    <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
                        {error}
                    </Typography>
                )}

                {/* Espaciado adicional entre el botón "Sign in" y "Forgot password" */}
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 3, backgroundColor: '#374249' }}
                    fullWidth
                    onClick={handleLogin}
                >
                    Sign in
                </Button>

                {/* Espaciado entre el botón y los enlaces */}
                <Typography sx={{ mt: 2 }}>
                    <Link href="/forgot-password">Forgot password</Link>
                </Typography>

                <Typography>
                    Do you have an account?
                    <Link href="/register"> Sign up</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;