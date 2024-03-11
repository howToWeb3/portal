import AOS from 'aos';
import Footer2 from 'components/footer/Footer2';
import { PATHS } from 'constants/common';
import { AppProvider } from 'context/App.context';
import { SnackbarProvider } from 'notistack';
import { React, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useXaman from 'utils/useXaman';
import Header from './components/header/Header';
import routes from './pages';
import Page404 from './pages/404';

function App() {
    const { autoLogin } = useXaman();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
        async function login() {
            try {
                const isAutoLoginAllowed = await autoLogin();
                if (isAutoLoginAllowed) {
                    navigate(PATHS.HOME);
                }
            } catch (err) {}
        }
        login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppProvider>
            <SnackbarProvider
                autoHideDuration={2000}
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Header />
                <Routes>
                    {routes.map((data, idx) => (
                        <Route
                            key={idx}
                            path={data.path}
                            element={data.component}
                            exact
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Page404 />}
                    />
                </Routes>
                <Footer2 />
            </SnackbarProvider>
        </AppProvider>
    );
}

export default App;
