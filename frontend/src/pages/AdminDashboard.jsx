import React from "react";
import SidebarComponent from "../components/Sidebar";
import { Dashboard, People, Settings } from "@mui/icons-material";

const adminMenuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Users", icon: <People />, path: "/admin/users" },
  { text: "Settings", icon: <Settings />, path: "/admin/settings" },
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