import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext.tsx';

const Navbar: React.FC = () => {
    const {logout, balance} = useAuth();

    const handleSignOut = (): void => {
        logout();
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Balance: ${balance}
                </Typography>
                <Button component={RouterLink} to="/new-operation" color="inherit">
                    New Operation
                </Button>
                <Button component={RouterLink} to="/records" color="inherit">
                    Records
                </Button>
                <Button onClick={handleSignOut} color="inherit">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
