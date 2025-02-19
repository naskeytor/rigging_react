import React, { useEffect, useState } from "react";
import { fetchData } from "./api"; // Asegúrate de que fetchData está en api.js

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData()
            .then(response => setData(response))
            .catch(error => console.error("Error al conectar con Flask:", error));
    }, []);

    return (
        <div>
            <h1>Prueba de conexión React ↔ Flask</h1>
            {data ? <p>Respuesta del backend: {JSON.stringify(data)}</p> : <p>Cargando...</p>}
        </div>
    );
};

export default App;

