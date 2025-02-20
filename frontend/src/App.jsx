import React from "react";
import { Box, Container, Typography } from "@mui/material";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        <Typography variant="h3" textAlign="center" color="primary">
          ¡Bienvenido a tu aplicación con MUI!
        </Typography>
      </Container>
    </Box>
  );
};

export default App;