import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormUserRegister from './FormUserRegister';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Bar () {

    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = createTheme({
        palette: {
            iconMenu: {
                main: '#fafafa',
                contrastText: '#fff',
            },
            button: {
                main: '#fafafa',
                contrastText: '#fff',
            },
            appBar: {
                main: '#424242'
                //7e3FF2 
            }
        },
    });

    const RegisterButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        margin: '12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        borderRadius: 25,
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    });

    const LoginButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#1111',
        borderColor: '#0063cc',
        borderRadius: 25,
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
    });



    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='appBar'>
                    <Toolbar>
                        <div>
                            <IconButton
                                size="large"
                                edge="start"
                                color='iconMenu'
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleClick}
                            >
                            <MenuIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem>
                                    <Link to={"/form"}>
                                        Form CSV
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'white' }}>
                            News
                        </Typography>
                        <LoginButton color="button">
                            <FormUserRegister nomeBotao={"Cadastrar"} isRegister={false} />
                        </LoginButton>
                        <RegisterButton color="button">
                            <FormUserRegister nomeBotao={"Entrar"} isRegister={true} />
                        </RegisterButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
  }