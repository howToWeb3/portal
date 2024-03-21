import AOS from 'aos';
import Footer2 from 'components/footer/Footer2';
import { AppProvider } from 'context/App.context';
import { SnackbarProvider } from 'notistack';
import { React, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import routes from './pages';
import Page404 from './pages/404';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
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
