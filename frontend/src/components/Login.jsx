import React, {useState, useEffect} from "react";
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
    InputAdornment,
    IconButton
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Login = ({setCurrentView}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            const userRole = Array.isArray(data.role) ? data.role[0] : data.role;
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", userRole);

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
        <Paper elevation={10} sx={{padding: 4, width: 350, textAlign: "center", borderRadius: 3}}>
            <Avatar sx={{bgcolor: "primary.main", color: "white", mx: "auto", mb: 2}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5" fontWeight="bold">Sign in</Typography>


            <TextField
                label="Username"
                fullWidth
                margin="normal"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <FormControlLabel
                control={<Checkbox color="primary"/>}
                label="Remember me"
                sx={{mt: 1}}
            />

            {error && <Typography color="error" sx={{textAlign: "center", mt: 1}}>{error}</Typography>}

            <Button
                type="submit"
                variant="contained"
                sx={{mt: 3, bgcolor: "primary.main", fontWeight: "bold"}}
                fullWidth
                onClick={handleLogin}
            >
                Sign in
            </Button>

            <Button fullWidth sx={{mt: 2, textTransform: "none"}} onClick={() => setCurrentView("forgotPassword")}>
                Forgot password?
            </Button>

            <Typography sx={{mt: 2}}>
                Don't have an account?{" "}
                <Button sx={{textTransform: "none"}} onClick={() => setCurrentView("register")}>Sign up</Button>
            </Typography>
        </Paper>
    );
};

export default Login;