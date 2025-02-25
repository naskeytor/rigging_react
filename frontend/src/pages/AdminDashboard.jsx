import React from "react";
import SidebarComponent from "../components/Sidebar";
import { Dashboard, People, Settings } from "@mui/icons-material";
import MuiDataGrid from "../components/DatagridTable.jsx";
import { Box } from "@mui/material";


const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
];

const rows = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "User" },
  { id: 3, name: "Charlie", role: "Rigger" },
];


const adminMenuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Users", icon: <People />, path: "/admin/users" },
  { text: "Settings", icon: <Settings />, path: "/admin/settings" },
];



const AdminDashboard = () => {
  return (
    <Box display="flex" height="100vh">
      <SidebarComponent menuItems={adminMenuItems} />
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1} p={3}>
        <MuiDataGrid rows={rows} columns={columns} pageSize={5} />
      </Box>
    </Box>
  );
};

export default AdminDashboard;