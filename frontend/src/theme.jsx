import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";  // Importar la fuente Poppins

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",  // Aplica Poppins en toda la app
    h1: { fontSize: "2.5rem", fontWeight: 700 },  // Títulos grandes
    h2: { fontSize: "2rem", fontWeight: 600 },    // Títulos medianos
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    body1: { fontSize: "1rem", fontWeight: 400 },
    button: { textTransform: "none", fontWeight: 600 },  // Evita mayúsculas forzadas en botones
  },
  palette: {
    background: {
      default: "#374249", // Color de fondo general
      paper: "#ffffff", // Color del fondo de tarjetas
    },
    primary: {
      main: "#000509", // Azul oscuro
    },
    secondary: {
      main: "#90A4AE", // Gris azulado
    },
  },
});

export default theme;