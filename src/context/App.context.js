import { PATHS } from 'constants/common';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStrg } from 'utils/common.utils';
import useXaman from 'utils/useXaman';

const AppContext = createContext();

// Custom hook to consume the context
export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const token = getDataFromLocalStrg('how_to_web3_token');
    const { autoLogin } = useXaman();
    const navigate = useNavigate();
    const [
        state,
        setState,
    ] = useState({
        address: token?.address ?? '',
    });

    useEffect(() => {
        async function login() {
            try {
                const isAutoLoginAllowed = await autoLogin();

                if (!isAutoLoginAllowed) {
                    navigate(PATHS.HOME);
                    setState({
                        ...state,
                        address: '',
                    });
                }
            } catch (err) {}
        }
        login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
