import {useState, useEffect} from "react";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/material";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Definir columnas de la tabla
    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {field: "username", headerName: "Nombre de Usuario", width: 200},
        {field: "email", headerName: "Email", width: 250},
        {field: "roles", headerName: "Roles", width: 200},
    ];

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/users", {withCredentials: true})  // Permitir cookies en la solicitud
            .then((response) => {
                const formattedUsers = response.data.map((user) => ({
                    ...user,
                    roles: user.roles.join(", "), // Convertir la lista de roles en una cadena
                }));
                setUsers(formattedUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los usuarios:", error);
                setLoading(false);
            });
    }, []);


    return (
        <Box sx={{height: 400, width: "100%"}}>
            <h1>Gestión de Usuarios</h1>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                loading={loading}
                disableSelectionOnClick
            />
        </Box>
    );
};

export default UsersPage;