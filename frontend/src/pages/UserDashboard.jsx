import React from "react";
import SidebarComponent from "../components/Sidebar";
import { Dashboard, People, Settings } from "@mui/icons-material";

const adminMenuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/user" },
];

const AdminDashboard = () => {
  return (
    <div>
      <SidebarComponent menuItems={adminMenuItems} />
      {/* Contenido del dashboard */}
    </div>
  );
};

export default AdminDashboard;