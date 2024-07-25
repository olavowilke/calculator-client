// src/context/UserContext.jsx
import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [balance, setBalance] = useState(0);

    return (
        <UserContext.Provider value={{balance, setBalance}}>
            {children}
        </UserContext.Provider>
    );
};
