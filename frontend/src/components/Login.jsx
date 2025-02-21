import React from "react";
import {
    Box,
    Checkbox,
    Typography,
    Button,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Link
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const paperStyle = {padding: 20, height: '70vh', width: 280, margin: '20px auto'}
const avatarStyle = {backgroundColor: '#95acc1'}
const btnStyle={margin:'8px 0'}

const Login = () => {
    return (
        <Box>
            <Paper elevation={10} style={paperStyle}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sighn in</h2>
                </Box>
                <TextField label='Username' placeholder='Enter username' fullWidth required></TextField>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required></TextField>
                <FormControlLabel
                    label="Remember me"
                    control={
                        <Checkbox
                            name="checked"
                            color="primary"
                            aria-label="primary"
                        />
                    }
                />
                <Button type='submit' color='primary' variant='contained' style={btnStyle} fullWidth>Sighn in</Button>
                <Typography>
                    <Link href="#">
                        Forgot password
                    </Link>
                </Typography>
                <Typography>  Do you have an acount?
                    <Link href="#">
                         Sign up
                    </Link>
                </Typography>
        </Paper>
</Box>
)
}

export default Login