// src/context/SnackbarContext.jsx
import React, {createContext, useContext, useState} from 'react';
import {Alert, Snackbar} from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({children}) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error',
    });

    const showSnackbar = (message, severity = 'error') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleClose = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    return (
        <SnackbarContext.Provider value={{showSnackbar}}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
