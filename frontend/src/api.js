const API_URL = "http://localhost/api";  // Nginx redirige a Flask

export const fetchData = async () => {
    try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al conectar con Flask:", error);
    }
};