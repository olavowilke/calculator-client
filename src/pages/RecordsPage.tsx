// src/pages/RecordsPage.tsx
import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { useSnackbar } from "../context/SnackbarContext";
import api from "../config/axiosConfig";

interface Record {
    _id: string;
    operation_id: {
        type: string;
    };
    operation_response: string;
}

const RecordsPage: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const {showSnackbar} = useSnackbar();

    useEffect(() => {
        fetchRecords();
    }, [page, rowsPerPage, search]);

    const fetchRecords = async () => {
        try {
            const response = await api.get('/records', {
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                    search,
                },
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                },
            });
            setRecords(response.data.data);
            setTotalPages(response.data.totalPages);
            setCount(response.data.count);
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error fetching records');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/records/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                },
            });
            fetchRecords();
        } catch (error) {
            showSnackbar(error.response?.data?.message || 'Error deleting record');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="lg" className="mt-20">
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Operation Records
                </Typography>
                <TextField
                    label="Search Response"
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Operation</TableCell>
                                <TableCell>Response</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record._id}>
                                    <TableCell>{record.operation_id.type}</TableCell>
                                    <TableCell>{record.operation_response}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(record._id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Container>
    );
};

export default RecordsPage;
