import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

const AdminDashboard = () => <h2>Admin Dashboard</h2>;
const RiggerDashboard = () => <h2>Rigger Dashboard</h2>;
const UserDashboard = () => <h2>User Dashboard</h2>;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/rigger-dashboard" element={<RiggerDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;