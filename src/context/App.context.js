import React, { createContext, useContext, useState } from 'react';
import { getDataFromLocalStrg } from 'utils/common.utils';

const AppContext = createContext();

// Custom hook to consume the context
export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const token = getDataFromLocalStrg('mb589_token');

    const [
        state,
        setState,
    ] = useState({
        address: token?.address ?? '',
    });

    return (
        <AppContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
