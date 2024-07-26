import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/new-operation');
    };

    return (
        <Container maxWidth="md">
            <Box textAlign="center" mt={10}>
                <Typography variant="h2" gutterBottom>
                    404 - Not Found
                </Typography>
                <Typography variant="h5" gutterBottom>
                    The page you are looking for does not exist.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleGoHome}>
                    Take me out!
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
