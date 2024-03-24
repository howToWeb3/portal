import NftImageLoader from 'components/nftImageLoader/NftImageLoader';
import { FILE_TYPE } from 'constants/common';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Link, useNavigate } from 'react-router-dom';
import { getIPFSUrl, renderValue } from 'utils/common.utils';

export default function NftCard({ data, slideDirection, redirectionUrl }) {
    const navigate = useNavigate();

    const onCardClick = () => {
        navigate(redirectionUrl, {
            state: {
                ...nftData,
                image,
                raw: nftData,
                fileType,
            },
        });
    };

    const [
        isImageLoaded,
        setIsImageLoaded,
    ] = useState(false);

    const [
        image,
        setImage,
    ] = useState(null);

    const [
        fileType,
        setFileType,
    ] = useState(null);

    const [
        nftData,
        setNftData,
    ] = useState(null);

    useEffect(() => {
        fetchSchema();
    }, []);

    const fetchSchema = async () => {
        try {
            const dataURI = getIPFSUrl(data.URI);
            const response = await fetch(dataURI);
            const fileType = response.headers.get('content-type');

            if (fileType.includes(FILE_TYPE.JSON)) {
                const json = await response.json();
                const image = json.image || json.image_url || json.animation;
                setNftData(json);
                setImage(getIPFSUrl(image));
                setFileType(FILE_TYPE.JSON);
            } else if (fileType.includes(FILE_TYPE.VIDEO)) {
                setImage(dataURI);
                setFileType(FILE_TYPE.VIDEO);
            } else if (fileType.includes(FILE_TYPE.IMAGE)) {
                setImage(dataURI);
                setFileType(FILE_TYPE.IMAGE);
            }

            setIsImageLoaded(true);
        } catch (err) {
            // reset the state
            setIsImageLoaded(true);
            console.log(err);
            setNftData(null);
            setImage(null);
            console.log('Some error occurred while fetching the data', err);
            enqueueSnackbar('Some error occurred. Please try after some time', {
                type: 'error',
            });
        }
    };

    if (data === null && isImageLoaded) {
        return <div>Sorry we are working on supporting your NFT data. Please be patient.</div>;
    }

    return (
        <div
            key={data.id}
            className="col-xl-3 col-md-6"
            onClick={onCardClick}
            data-aos={`flip-${slideDirection}`}
            data-aos-duration="2000"
        >
            <LazyLoad offset={200}>
                <div className="nft-item">
                    <div className="card-media">
                        <Link to="#">
                            <NftImageLoader
                                image={image}
                                isImageLoaded={isImageLoaded}
                                type={fileType}
                            />
                        </Link>
                    </div>
                    <div className="card-title">
                        <Link
                            to="#"
                            className="h5"
                        >
                            {renderValue(nftData?.name)}
                        </Link>
                    </div>
                    <div className="card-bottom style-explode">
                        <div className="price">
                            {/* <Image
                            className="icon"
                            src={LINKS.XRP_ICON}
                            width={35}
                            height={35}
                            alt="icon"
                        /> */}
                            <div className="price-details">
                                <h6>{renderValue(nftData?.collection?.name)}</h6>
                                <span>{renderValue(nftData?.collection?.description || nftData?.description)}</span>
                            </div>
                        </div>
                        <div className="button-place-bid">
                            <Link
                                to=""
                                data-toggle="modal"
                                data-target="#popup_bid"
                                className="sc-button"
                            >
                                <span>View</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </LazyLoad>
        </div>
    );
}
