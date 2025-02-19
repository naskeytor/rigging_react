const API_URL = "http://localhost/api";  // Flask via Nginx

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",  // Importante para manejar sesiones
    });
    return response.json();
};

export const getUser = async () => {
    const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        credentials: "include",
    });
    return response.json();
};