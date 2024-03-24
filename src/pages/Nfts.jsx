import { LINKS, PATHS } from 'constants/common';
import { useAppContext } from 'context/App.context';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserNfts from './UserNfts';

function Nfts() {
    const { state } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.address) {
            enqueueSnackbar('Please sign in to continue', { variant: 'info' });
            navigate(PATHS.HOME);
            return;
        }
    }, [
        state.address,
        navigate,
    ]);

    if (!state.address) {
        return null;
    }

    return (
        <div className="wrapper page-nfts">
            <div className="container head">
                <div className="d-flex flex-column align-items-center">
                    <div className="head-container d-flex align-items-center">
                        <h4 className="title">
                            <span className="title-text">NFTs.</span>
                            <span className="sub-title-text">Pixel perfection, worth every byte.</span>
                        </h4>
                    </div>
                </div>
                <Image
                    src={`${LINKS.CDN}/images/png/logo/HWT3_logo_baseflat.png`}
                    className="header-bg-image"
                />
            </div>

            <UserNfts />
        </div>
    );
}

export default Nfts;
