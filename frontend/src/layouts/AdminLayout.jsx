import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Dashboard, People, Settings } from "@mui/icons-material"; // Importa iconos si usas Material-UI

const AdminLayout = () => {
  // Definir los elementos del menú
  const adminMenuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { text: "Users", icon: <People />, path: "/admin/users" },
    { text: "Settings", icon: <Settings />, path: "/admin/settings" },
  ];

  return (
    <div style={{ display: "flex" }}>
      {/* Pasamos menuItems al Sidebar */}
      <Sidebar menuItems={adminMenuItems} />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Aquí se renderizarán las páginas dentro de /admin */}
      </div>
    </div>
  );
};

export default AdminLayout;