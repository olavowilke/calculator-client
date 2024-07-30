import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    user: string | null;
    balance: number;
    setBalance: (balance: number) => void;
    login: (token: string, initialBalance: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context: AuthContextProps | undefined = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const navigate = useNavigate();

    useEffect((): void => {
        const token: string | null = localStorage.getItem('token');
        const storedBalance: string | null = localStorage.getItem('balance');
        if (token) {
            setUser(token);
        }
        if (storedBalance) {
            setBalance(Number(storedBalance));
        }
    }, []);

    const login = (token: string, initialBalance: number): void => {
        localStorage.setItem('token', token);
        localStorage.setItem('balance', initialBalance.toString());
        setUser(token);
        setBalance(initialBalance);
    };

    const logout = (): void => {
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
