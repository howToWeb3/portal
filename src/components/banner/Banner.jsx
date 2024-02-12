import logo from 'assets/images/logo/logo.png';
import XamanScanModal from 'components/xamanScanModal/XamanScanModal';
import { LINKS, XAMAN_INITIAL_STATE } from 'constants/common';
import { useAppContext } from 'context/App.context';
import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useMergedState from 'utils/useMergedState';
import useXaman from 'utils/useXaman';

function Banner() {
    const [
        xamanState,
        setXammState,
    ] = useMergedState({ ...XAMAN_INITIAL_STATE });
    const [
        cdnData,
        setCdnData,
    ] = useState({});

    const { state: contextState, setState: setContextState } = useAppContext();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/banner.json`);
            const data = await response.json();
            setCdnData(data);
        }
        fetchData();
    }, []);

    const { handleLogin: handleXamanLogin } = useXaman();

    const onXClick = () => {
        window.open(LINKS.TWITTER, '_blank');
    };

    const handleLogin = async () => {
        await handleXamanLogin(setXammState, setContextState);
    };

    const onModalClose = () => {
        setXammState({ ...XAMAN_INITIAL_STATE });
    };

    return (
        <section className="banner">
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
            <div className="shape right"></div>
            {cdnData.heading && (
                <div className="container big">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="banner__left">
                                <div className="block-text">
                                    <h2 className="heading">
                                        {cdnData.heading}
                                        <span className="s1 arlo_tm_animation_text_word">{cdnData.subHeading}</span>
                                    </h2>
                                    <p className="desc">{cdnData.desc}</p>
                                    {!contextState.address && (
                                        <Link
                                            onClick={handleLogin}
                                            className="action-btn"
                                        >
                                            <span
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                            >
                                                {cdnData.getConnectedBtnText}
                                            </span>
                                        </Link>
                                    )}
                                </div>

                                <div className="pay">
                                    <h6>{cdnData.acceptText}</h6>

                                    <div className="list">
                                        <p>{cdnData.acceptSubText}</p>

                                        <ul>
                                            {cdnData.acceptList.map((x, i) => (
                                                <li key={i}>
                                                    <Link to="#">
                                                        <span className="fs">{x}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="banner__right">
                                <div className="image">
                                    <img
                                        src={LINKS.CDN + cdnData.bannerRight.img}
                                        alt="banner"
                                    />
                                </div>

                                <div className="price">
                                    <div className="icon">
                                        <img
                                            src={LINKS.CDN + '/images/png/icon/icon-01.png'}
                                            alt="price"
                                        />
                                    </div>
                                    <div className="content">
                                        <p>{cdnData.ourThing.heading}</p>
                                        <h5>{cdnData.ourThing.subHeading}</h5>
                                    </div>
                                </div>

                                <div className="owner">
                                    <div className="image">
                                        <img
                                            src={logo}
                                            alt="owner"
                                        />
                                    </div>
                                    <div
                                        className="content"
                                        onClick={onXClick}
                                    >
                                        <h5>{cdnData.owner.name}</h5>
                                        <p>{cdnData.owner.handle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Banner;
