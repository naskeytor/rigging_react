import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import SidebarComponent from "../components/Sidebar";
import MuiDataGrid from "../components/DatagridTable.jsx";
import { Box } from "@mui/material";
import { Dashboard, People, Settings } from "@mui/icons-material";

const adminMenuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { text: "Users", icon: <People />, path: "/admin/users" },
    { text: "Settings", icon: <Settings />, path: "/admin/settings" },
];

const AdminDashboard = () => {
    const { users, loading } = useContext(UserContext);

    return (
        <Box display="flex" height="100vh">
            <SidebarComponent menuItems={adminMenuItems} />

            {/* 🔴 Este contenedor ahora respeta el ancho del sidebar */}
            <Box component="main"
                 sx={{
                     flexGrow: 1,
                     p: 3,
                     marginLeft: { xs: "60px", sm: "240px" }, // 🔴 Se ajusta al ancho del sidebar
                     transition: "margin 0.3s ease-in-out", // 🔴 Suaviza el cambio cuando el sidebar se expande
                 }}
            >
                
            </Box>
        </Box>
    );
};

export default AdminDashboard;
