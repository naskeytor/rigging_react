import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    TextField,
    Link
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const paperStyle = {padding: 20, height: '80vh', width: 280, margin: '20px auto'};
const avatarStyle = {backgroundColor: '#374249', color: 'white'};
const btnStyle = {margin: '8px 0', backgroundColor: '#374249'};

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://127.0.0.1:5000/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro");
            }

            setSuccess("Registro exitoso. Redirigiendo al login...");
            setTimeout(() => navigate("/"), 2000); // Redirigir al login después de 2 segundos

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box>
            <Paper elevation={10} style={paperStyle}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <Typography variant="h5">Sign Up</Typography>
                </Box>

                <TextField
                    label='Username'
                    placeholder='Enter username'
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{mt: 2}}
                />
                <TextField
                    label='Email'
                    placeholder='Enter email'
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{mt: 2}}
                />
                <TextField
                    label='Password'
                    placeholder='Enter password'
                    type='password'
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{mt: 2}}
                />

                {error && (
                    <Typography color="error" sx={{textAlign: "center", mt: 2}}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" sx={{textAlign: "center", mt: 2}}>
                        {success}
                    </Typography>
                )}

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnStyle}
                    fullWidth
                    onClick={handleRegister}
                >
                    Register
                </Button>

                <Typography sx={{mt: 2}}>
                    Already have an account?{" "}
                    <Link href="/">Sign in</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;