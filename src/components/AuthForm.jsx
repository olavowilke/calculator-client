// src/components/AuthForm.jsx
import React, {useState} from 'react';
import {Box, Button, Container, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import {useSnackbar} from '../context/SnackbarContext.jsx';
import api from "../config/axiosConfig.js";


const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();
    const {showSnackbar} = useSnackbar();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', {username, password});
            login(response.data.token, response.data.balance);
            navigate('/new-operation');
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={10} mb={4}>
                <Box mb={4}>
                    <TextField
                        label="Email"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </Box>
                <Box mb={4}>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </Box>
                <Button
                    onClick={handleLogin}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default AuthForm;
