import {useState, useEffect} from "react";
import axios from "axios";
import SidebarComponent from "../components/Sidebar";
import {Dashboard, People, Settings} from "@mui/icons-material";
import MuiDataGrid from "../components/DatagridTable.jsx";
import {Box} from "@mui/material";

const columns = [
    {field: "id", headerName: "ID", width: 100},
    {field: "username", headerName: "Nombre", width: 200},
    {field: "role", headerName: "Rol", width: 200},
];

const adminMenuItems = [
    {text: "Dashboard", icon: <Dashboard/>, path: "/admin"},
    {text: "Users", icon: <People/>, path: "/admin/users"},
    {text: "Settings", icon: <Settings/>, path: "/admin/settings"},
];

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/users", {withCredentials: true})  // ⬅️ Habilita cookies de sesión
            .then((response) => {
                console.log("Usuarios recibidos:", response.data);
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los usuarios:", error);
                setLoading(false);
            });
    }, []);

    return (
        <Box display="flex" height="100vh">
            <SidebarComponent menuItems={adminMenuItems}/>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1} p={3}>
                <MuiDataGrid rows={users} columns={columns} loading={loading}/>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
