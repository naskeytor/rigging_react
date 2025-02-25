import React, {useState} from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Tooltip,
    Toolbar,
    Typography,
    AppBar
} from "@mui/material";
import {Menu, ChevronLeft, ChevronRight, ExitToApp} from "@mui/icons-material";
import {styled, useTheme} from "@mui/system";
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;

const Sidebar = styled(Drawer, {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
    width: open ? drawerWidth : 60,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    transition: "width 0.3s ease-in-out",
    overflowX: "hidden",
    '& .MuiDrawer-paper': {
        width: open ? drawerWidth : 60,
        transition: "width 0.3s ease-in-out",
    },
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
}));

const AppBarStyled = styled(AppBar)(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const SidebarComponent = ({menuItems}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const toggleDrawer = () => setOpen(!open);

    const handleLogout = () => {
        // Aquí puedes limpiar cualquier estado global o token antes de redirigir
        navigate("/");
    };

    return (
        <>
            <AppBarStyled position="fixed" open={open}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start"
                                sx={{marginRight: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{flexGrow: 1}}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout} sx={{marginLeft: "auto"}}>
                        <ExitToApp/>
                    </IconButton>
                </Toolbar>
            </AppBarStyled>
            <Sidebar variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Menu
                    </Typography>
                    <IconButton onClick={toggleDrawer}>
                        {open ? <ChevronLeft/> : <ChevronRight/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {menuItems.map((item) => (
                        <Tooltip title={!open ? item.text : ""} placement="right" key={item.text}>
                            <ListItem onClick={() => navigate(item.path)} sx={{justifyContent: "center"}}>
                                <ListItemIcon sx={{
                                    minWidth: "auto",
                                    justifyContent: "center",
                                    display: "flex"
                                }}>{item.icon}</ListItemIcon>
                                {open && <ListItemText primary={item.text}/>}
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Sidebar>
        </>
    );
};

export default SidebarComponent;