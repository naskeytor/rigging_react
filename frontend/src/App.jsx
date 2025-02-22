import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./pages/Admin";
import Rigger from "./pages/Rigger";
import User from "./pages/User";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rigger" element={<Rigger />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;