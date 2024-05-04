import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    // Save user ID to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => React.useContext(UserContext);
