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
import { ExitToApp } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const drawerWidth = 50;

const SidebarStyled = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
        width: drawerWidth,
        overflowX: "hidden",
        backgroundColor: "#000000",
        color: "#fff",
    },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#000000"
}));

const SidebarComponent = ({ menuItems }) => {
    const navigate = useNavigate();

    return (
        <>
            <AppBarStyled position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={() => navigate("/")}>
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBarStyled>

            <SidebarStyled variant="permanent">
                <Divider />
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
            </SidebarStyled>
        </>
    );
};

export default SidebarComponent;
