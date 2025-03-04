import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/users", { withCredentials: true })
            .then((response) => {
                const formattedUsers = response.data.map((user) => ({
                    ...user,
                    roles: user.roles.join(", "), // Convertir roles a string
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
        <UserContext.Provider value={{ users, loading }}>
            {children}
        </UserContext.Provider>
    );
};
