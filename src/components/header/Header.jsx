import logo from 'assets/images/logo/logo-long.png';
import { PATHS, XAMAN_INITIAL_STATE } from 'constants/common';
import { useAppContext } from 'context/App.context';
import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
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

    const [
        activeIndex,
        setActiveIndex,
    ] = useState(null);

    const handleMenuActive = () => {
        setMenuActive(!menuActive);
    };

    const handleDropdown = index => {
        setActiveIndex(index);
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
            className={`header $ {
                scroll ? 'is-fixed' : ''
            }
            `}
        >
            <div className="banner-modal">
                <Modal
                    show={xamanState.openModal}
                    keyboard={false}
                    onHide={onModalClose}
                    centered
                >
                    <Modal.Body style={{ textAlign: 'center' }}>
                        <Modal.Title
                            style={{
                                background: 'var(--primary-color)',
                                borderRadius: '20px',
                                fontSize: '30px',
                                padding: '15px',
                            }}
                        >
                            Scan using XAMAN
                        </Modal.Title>
                        {xamanState.img ? (
                            <img
                                src={xamanState.img}
                                alt="qrcode"
                                className="p-3"
                                width={200}
                                height={200}
                            />
                        ) : (
                            <div className="p-4">
                                <Spinner
                                    animation="border"
                                    variant="primary"
                                />
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
            <div className="container big">
                <div className="row">
                    <div className="col-12">
                        <div className="header__body">
                            <div className="header__logo">
                                <Link to="/">
                                    <img
                                        id="site-logo"
                                        src={logo}
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="header__right">
                                <nav
                                    id="main-nav"
                                    className={`main-nav $ {
                menuActive ? 'active' : ''
            }

            `}
                                >
                                    <ul
                                        id="menu-primary-menu"
                                        className="menu"
                                    >
                                        {menus.map((data, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => handleDropdown(idx)}
                                                className={`menu-item $ {
                            data.namesub ? 'menu-item-has-children' : ''
                        }

                        $ {
                            activeIndex===idx ? 'active' : ''
                        }

                        `}
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
                                    className={`mobile-button $ {
                menuActive ? 'active' : ''
            }

            `}
                                    onClick={handleMenuActive}
                                >
                                    <span></span>
                                </div>
                            </div>
                            <div className="header__action">
                                {contextState.address ? (
                                    <Link
                                        className="address-btn"
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
