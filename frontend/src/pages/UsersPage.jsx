import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import SidebarComponent from "../components/Sidebar";
import MuiDataGrid from "../components/DatagridTable.jsx";
import {Box} from "@mui/material";
import {Dashboard, People, Settings} from "@mui/icons-material";

const adminMenuItems = [
    {text: "Dashboard", icon: <Dashboard/>, path: "/admin"},
    {text: "Users", icon: <People/>, path: "/admin/users"},
    {text: "Settings", icon: <Settings/>, path: "/admin/settings"},
];

const UsersPage = () => {
    const {users, loading} = useContext(UserContext);

    return (
        <Box display="flex" height="100vh">
            <SidebarComponent menuItems={adminMenuItems}/>

            {/* 🔹 Contenedor principal ajustado */}
            <Box component="main"
                 sx={{
                     flexGrow: 1,
                     p: 3,
                     //marginLeft: `${80}px`, // 🔴 Ajuste para sidebar fijo
                     marginLeft: "10px", // 🔴 Ajuste al ancho del Sidebar
                     marginTop: "80px",  // 🔴 Evita que la tabla quede debajo del AppBar
                     transition: "margin 0.3s ease-in-out",
                     display: "flex",
                     justifyContent: "center",  // 🔴 Centra la tabla horizontalmente
                     alignItems: "center",      // 🔴 Centra la tabla verticalmente
                 }}
            >
                <MuiDataGrid
                    rows={users}
                    columns={[
                        {field: "id", headerName: "ID", width: 100},
                        {field: "username", headerName: "Nombre de Usuario", width: 200},
                        {field: "email", headerName: "Email", width: 250},
                        {field: "roles", headerName: "Roles", width: 200},
                    ]}
                    loading={loading}
                />
            </Box>
        </Box>
    );
};

export default UsersPage;
