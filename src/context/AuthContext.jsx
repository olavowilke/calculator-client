import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedBalance = localStorage.getItem('balance');
        if (token) {
            setUser(token);
        }
        if (storedBalance) {
            setBalance(Number(storedBalance));
        }
    }, []);

    const login = (token, initialBalance) => {
        localStorage.setItem('token', token);
        localStorage.setItem('balance', initialBalance);
        setUser(token);
        setBalance(initialBalance);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('balance');
        setUser(null);
        setBalance(0);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{user, balance, setBalance, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
