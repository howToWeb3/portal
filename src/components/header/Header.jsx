import logo from 'assets/images/logo/logo-long.png';
import XamanScanModal from 'components/xamanScanModal/XamanScanModal';
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
                {/* <Modal
                    show={xamanState.openModal}
                    keyboard={false}
                    onHide={onModalClose}
                    centered
                >
                    <Modal.Body className="custom-modal-body">
                        <div className="text-start p-3">
                            <Modal.Title className="fs-2 pb-2">Scan QR</Modal.Title>
                            <ul className="list-group list-group-numbered">
                                <li className="list-group-item ps-0 bg-transparent text-white border-0">
                                    Open Xaman Wallet
                                </li>
                                <li className="list-group-item ps-0 bg-transparent text-white border-0">
                                    Click the middle icon at the bottom
                                </li>
                                <li className="list-group-item ps-0 bg-transparent text-white border-0">
                                    Scan the QR code
                                </li>
                                <li className="list-group-item ps-0 bg-transparent text-white border-0">
                                    Approve the Sign In transaction
                                </li>
                            </ul>
                        </div>
                        <div className="img-container">
                            {xamanState.img ? (
                                <img
                                    src={xamanState.img}
                                    alt="qrcode"
                                    className="p-3"
                                />
                            ) : (
                                <div className="p-4">
                                    <Spinner
                                        animation="border"
                                        variant="primary"
                                    />
                                </div>
                            )}
                        </div>
                    </Modal.Body>
                </Modal> */}
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
