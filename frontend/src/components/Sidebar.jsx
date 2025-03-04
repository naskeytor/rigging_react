import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Tooltip,
    Divider,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";

const drawerWidth = 80; // 🔴 Sidebar fijo en 80px

const Sidebar = styled(Drawer)(({theme}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        overflowX: "hidden",
        backgroundColor: "#222", // 🔴 Color oscuro para el sidebar
        color: "#fff",
    },
}));

const AppBarStyled = styled(AppBar)(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidth}px)`, // 🔴 Ajuste dinámico con sidebar
    marginLeft: drawerWidth,
}));

const SidebarComponent = ({menuItems}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes limpiar cualquier estado global o token antes de redirigir
        navigate("/");
    };

    return (
        <>
            {/* 🔹 AppBar solo con título y logout */}
            <AppBarStyled position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <ExitToApp/>
                    </IconButton>
                </Toolbar>
            </AppBarStyled>

            {/* 🔹 Sidebar compacto con íconos */}
            <Sidebar variant="permanent">
                <Divider/>
                <List>
                    {menuItems.map((item) => (
                        <Tooltip title={item.text} placement="right" key={item.text}>
                            <ListItem
                                button
                                onClick={() => navigate(item.path)}
                                sx={{ justifyContent: "center" }}
                            >
                                <ListItemIcon sx={{ color: "#fff", display: "flex", justifyContent: "center" }}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Sidebar>
        </>
    );
};

export default SidebarComponent;