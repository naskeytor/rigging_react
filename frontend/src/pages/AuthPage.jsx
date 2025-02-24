import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import { Box, Paper } from "@mui/material";

const AuthPage = () => {
    const [currentView, setCurrentView] = useState("login");
    const [resetToken, setResetToken] = useState(null);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>

                {currentView === "login" && <Login setCurrentView={setCurrentView} />}
                {currentView === "register" && <Register setCurrentView={setCurrentView} />}
                {currentView === "forgotPassword" && <ForgotPassword setCurrentView={setCurrentView} />}
                {currentView === "resetPassword" && <ResetPassword setCurrentView={setCurrentView} token={token} />}

        </Box>
    );
};

export default AuthPage;
