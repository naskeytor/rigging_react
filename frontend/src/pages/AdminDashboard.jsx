import { useContext } from "react";
import { UserContext } from "../context/UserContext";
//import SidebarComponent from "../components/Sidebar";
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
        <Box component="main"
             sx={{
                 flexGrow: 1,
                 p: 3,
                 marginLeft: "80px", // 🔴 Ajuste correcto basado en el ancho del Sidebar
                 transition: "margin 0.3s ease-in-out",
             }}
        >
            {/* Aquí va el contenido del Dashboard */}

        </Box>
    );
};

export default AdminDashboard;
