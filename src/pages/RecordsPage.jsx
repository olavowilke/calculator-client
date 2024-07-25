import React, {useEffect, useState} from 'react';
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
import {Delete as DeleteIcon, Search as SearchIcon} from '@mui/icons-material';
import {useSnackbar} from "../context/SnackbarContext.jsx";
import api from "../config/axiosConfig.js";

const RecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [count, setCount] = useState(0);
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
                    Authorization: localStorage.getItem('token'),
                },
            });
            setRecords(response.data.data);
            setTotalPages(response.data.totalPages);
            setCount(response.data.count);
        } catch (error) {
            showSnackbar(error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/records/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            fetchRecords();
        } catch (error) {
            showSnackbar(error.response.data.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
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
