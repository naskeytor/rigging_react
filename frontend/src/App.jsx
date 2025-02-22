import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./pages/Admin";
import Rigger from "./pages/Rigger";
import User from "./pages/User";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword"; // 👈 Importa ForgotPassword

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta para solicitar el enlace de recuperación */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Ruta para restablecer la contraseña */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["rigger"]} />}>
          <Route path="/rigger" element={<Rigger />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;