import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface SnackbarContextProps {
    showSnackbar: (message: string, severity?: AlertColor) => void;
}

interface SnackbarProviderProps {
    children: ReactNode;
}

interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = (): SnackbarContextProps => {
    const context: SnackbarContextProps | undefined = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'error',
    });

    const showSnackbar = (message: string, severity: AlertColor = 'error') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleClose = () => {
        setSnackbar((prevState: SnackbarState) => ({
            ...prevState,
            open: false,
        }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
