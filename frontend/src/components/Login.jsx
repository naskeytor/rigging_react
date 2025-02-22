import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Checkbox,
    Typography,
    Button,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Link
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const paperStyle = {padding: 20, height: '70vh', width: 280, margin: '20px auto'};
const avatarStyle = {backgroundColor: '#374249', color: 'white'};
const btnStyle = {margin: '8px 0', backgroundColor: '#374249'};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // Limpiar errores previos
        try {
            const response = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            // Extraer el primer rol si `data.role` es una lista
            const userRole = Array.isArray(data.role) ? data.role[0] : data.role;

            // Guardamos el token y el rol en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", userRole);

            // Redirigir según el rol
            switch (userRole) {
                case "admin":
                    navigate("/admin");
                    break;
                case "rigger":
                    navigate("/rigger");
                    break;
                case "user":
                    navigate("/user");
                    break;
                default:
                    setError("Rol desconocido");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box>
            <Paper elevation={10} style={paperStyle}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign in</h2>
                </Box>

                <TextField
                    label='Username' from flask_cors import CORS
                    placeholder='Enter username'
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label='Password'
                    placeholder='Enter password'
                    type='password'
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <FormControlLabel
                    label="Remember me"
                    control={<Checkbox name="checked" color="primary" aria-label="primary"/>}
                />

                {error && (
                    <Typography color="error" sx={{textAlign: "center", mt: 1}}>
                        {error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnStyle}
                    fullWidth
                    onClick={handleLogin}
                >
                    Sign in
                </Button>

                <Typography>
                    <Link href="#">Forgot password</Link>
                </Typography>
                <Typography>Do you have an account?
                    <Link href="#"> Sign up</Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;