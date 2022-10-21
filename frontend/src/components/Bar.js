import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import relatorioSatisfacaoReducer from './../reducers/relatorioSatisfacaoReducer';

import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Bar () {

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

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='appBar'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color='iconMenu'
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'white' }}>
                        News
                    </Typography>
                    <Button color="button">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
        </ThemeProvider>
    );
  }