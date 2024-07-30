import React, { ChangeEvent, useState } from 'react';
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext';
import { useAuth } from '../context/AuthContext';
import api from '../config/axiosConfig.tsx';
import { AxiosResponse } from "axios";

const Calculator: React.FC = () => {
    const [param1, setParam1] = useState<string>('');
    const [param2, setParam2] = useState<string>('');
    const [operation, setOperation] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const {setBalance} = useAuth();
    const {showSnackbar} = useSnackbar();

    const handleOperationChange = (e: ChangeEvent<{ value: unknown }>) => {
        setOperation(e.target.value as string);
        if (e.target.value === 'square_root') {
            setParam2('');
        }
    };

    const handleCalculate = async (): Promise<void> => {
        try {
            const response: AxiosResponse<any, any> = await api.post('/records', {
                param1: parseFloat(param1),
                param2: param2 ? parseFloat(param2) : null,
                operationType: operation
            }, {
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                },
            });
            setResult(response.data.data.operation_response);
            setBalance(response.data.data.user_balance);
        } catch (error: any) {
            setResult('Error');
            showSnackbar(error.response?.data?.message || 'Error occurred');
        }
    };

    const handleRandomString = async () => {
        try {
            const response: AxiosResponse<any, any> = await api.post('/records', {
                operationType: 'random_string'
            }, {
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                },
            });
            setResult(response.data.data.operation_response);
            setBalance(response.data.data.user_balance);
        } catch (error: any) {
            setResult('Error');
            showSnackbar(error.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h4" gutterBottom>
                    New Operation
                </Typography>
                <Box mb={4}>
                    <TextField
                        label="Param 1"
                        type="number"
                        value={param1}
                        onChange={(e) => setParam1(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </Box>
                <Box mb={4}>
                    <TextField
                        label="Operation"
                        value={operation}
                        onChange={handleOperationChange}
                        select
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        <MenuItem value="addition">+</MenuItem>
                        <MenuItem value="subtraction">-</MenuItem>
                        <MenuItem value="multiplication">*</MenuItem>
                        <MenuItem value="division">/</MenuItem>
                        <MenuItem value="square_root">√</MenuItem>
                    </TextField>
                </Box>
                {operation !== 'square_root' && (
                    <Box mb={4}>
                        <TextField
                            label="Param 2"
                            type="number"
                            value={param2}
                            onChange={(e) => setParam2(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                )}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={handleCalculate}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Calculate
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={handleRandomString}
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Generate Random String
                        </Button>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <TextField
                        label="Result"
                        value={result}
                        inputProps={
                            {readOnly: true,}
                        }
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Calculator;
