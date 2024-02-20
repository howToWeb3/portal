import XamanScanModal from 'components/xamanScanModal/XamanScanModal';
import { LINKS, PATHS, XAMAN_INITIAL_STATE } from 'constants/common';
import { useAppContext } from 'context/App.context';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useMergedState from 'utils/useMergedState';
import useXaman from 'utils/useXaman';
import menus from '../../pages/menu';
import './styles.scss';

const Header = () => {
    const [
        scroll,
        setScroll,
    ] = useState(false);

    const [
        xamanState,
        setXammState,
    ] = useMergedState({ ...XAMAN_INITIAL_STATE });

    const { state: contextState, setState: setContextState } = useAppContext();

    const { handleLogin: handleXamanLogin } = useXaman();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 300);
        });

        return () => {
            setScroll({});
        };
    }, []);

    const [
        menuActive,
        setMenuActive,
    ] = useState(null);

    const handleMenuActive = () => {
        setMenuActive(!menuActive);
    };

    const handleLogin = async () => {
        await handleXamanLogin(setXammState, setContextState);
    };

    const onModalClose = () => {
        setXammState(XAMAN_INITIAL_STATE);
    };

    return (
        <header
            id="header_main"
            className={`header is-fixed`}
        >
            <div className="banner-modal">
                <XamanScanModal
                    show={xamanState.openModal}
                    onHide={onModalClose}
                    heading="Scan QR"
                    img={xamanState.img}
                    instructions={[
                        'Open Xaman Wallet',
                        'Click the middle icon at the bottom',
                        'Scan the QR code',
                        'Approve the Sign In transaction',
                    ]}
                />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header__body">
                            <div className="header__logo">
                                <Link to="/">
                                    <img
                                        id="site-logo"
                                        src={`${LINKS.CDN}/images/png/logo/HWT_long_logo.png`}
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="header__right">
                                <nav
                                    id="main-nav"
                                    className="main-nav"
                                >
                                    <ul
                                        id="menu-primary-menu"
                                        className="menu"
                                    >
                                        {menus.map((data, idx) => (
                                            <li
                                                key={idx}
                                                className="menu-item"
                                            >
                                                <Link to={data.links}> {data.name}</Link>
                                                {data.namesub && (
                                                    <ul className="sub-menu">
                                                        {data.namesub.map(submenu => (
                                                            <li
                                                                key={submenu.id}
                                                                className="menu-item"
                                                            >
                                                                <NavLink to={submenu.links}>{submenu.sub}</NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div
                                    className={`mobile-button ${menuActive ? 'active' : ''}`}
                                    onClick={handleMenuActive}
                                >
                                    <span></span>
                                </div>
                            </div>
                            <div className="header__action">
                                {contextState.address ? (
                                    <Link
                                        className="action-btn"
                                        to={PATHS.ACCOUNT_DETAILS}
                                    >
                                        <span>{contextState.address}</span>
                                    </Link>
                                ) : (
                                    <Link
                                        onClick={handleLogin}
                                        className="action-btn"
                                    >
                                        <span>Join Now</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
