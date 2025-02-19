import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AuthPage from "./AuthPage";

const AdminDashboard = () => <h2>Admin Dashboard</h2>;
const RiggerDashboard = () => <h2>Rigger Dashboard</h2>;
const UserDashboard = () => <h2>User Dashboard</h2>;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />

                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/rigger-dashboard" element={<RiggerDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;