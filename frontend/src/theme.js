import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#374249", // Azul-gris claro
      paper: "#FFFFFF", // Fondo de tarjetas o elementos elevados
    },
    primary: {
      main: "#000509", // Azul más intenso
    },
    secondary: {
      main: "#90A4AE", // Gris azulado
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;