import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./components/Register";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import RiggerDashboard from "./pages/RiggerDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import UsersPage from "./pages/UsersPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import AdminLayout from "./layouts/AdminLayout";
import theme from "./theme";

// 🔹 Importar el UserProvider
import { UserProvider } from "./context/UserContext";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider> {/* 🔴 Envolver toda la app para que UsersPage y AdminDashboard compartan el estado */}
                <Router>
                    <Routes>
                        <Route path="/" element={<AuthPage />} />
                        <Route path="/register" element={<Register />} />

                        {/* Ruta para solicitar el enlace de recuperación */}
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        {/* Ruta para restablecer la contraseña */}
                        <Route path="/reset-password/:token" element={<ResetPassword />} />

                        {/* Rutas protegidas */}
                        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="users" element={<UsersPage />} /> {/* /admin/users */}
                            </Route>
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={["rigger"]} />}>
                            <Route path="/rigger" element={<RiggerDashboard />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                            <Route path="/user" element={<UserDashboard />} />
                        </Route>

                    </Routes>
                </Router>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;