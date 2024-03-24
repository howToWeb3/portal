import NftImageLoader from 'components/nftImageLoader/NftImageLoader';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIPFSUrl, renderValue } from 'utils/common.utils';

function NftDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [
        isRawDataVisible,
        setIsRawDataVisible,
    ] = useState(true);

    if (!location.state) {
        return null;
    }

    const { name, image, description, collection, attributes, raw, fileType } = location.state;

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleRawData = () => {
        setIsRawDataVisible(prevState => !prevState);
    };

    return (
        <div className="nft-details-container">
            <div className="container d-flex flex-column align-items-center">
                <div className="header-container">
                    <div
                        className="back-button"
                        onClick={handleBackClick}
                    >
                        <span className="back-text">BACK</span>
                    </div>
                    {(name || collection?.name) && (
                        <div className="nft-title">{renderValue(name || collection.name)}</div>
                    )}
                </div>
            </div>
            <div className="nft-details">
                <div className="row acc-details justify-content-center">
                    <div className="col-md-4">
                        <div className="nft-image-container">
                            {image && (
                                <NftImageLoader
                                    image={image}
                                    isImageLoaded={true}
                                    className="img-fluid"
                                    data-aos="zoom-in"
                                    type={fileType}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="nft-details-content">
                            {collection?.name && (
                                <div className="detail-item">
                                    <span className="fw-semibold">Collection</span>
                                    <p>{renderValue(collection.name)}</p>
                                </div>
                            )}
                            {(description || collection?.description) && (
                                <div className="detail-item">
                                    <span className="fw-semibold">Description</span>
                                    <p>{renderValue(description || collection.description)}</p>
                                </div>
                            )}
                            {collection?.image && (
                                <div className="detail-item">
                                    <span className="fw-semibold">Collection Logo URL</span>
                                    <p>
                                        <div className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                            {renderValue(collection.image)}
                                        </div>
                                    </p>
                                </div>
                            )}
                            <div className="detail-item">
                                <span className="fw-semibold mb-1">Attributes</span>
                                <div className="tags-container">
                                    {attributes?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="tag"
                                        >
                                            {tag.trait_type + `: ` + tag.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="raw-data-container">
                    <div
                        className="raw-data-header"
                        onClick={toggleRawData}
                    >
                        <span>RAW NFT DATA</span>
                        <span>{isRawDataVisible ? '-' : '+'}</span>
                    </div>
                    {isRawDataVisible && (
                        <pre
                            className="raw-data-content"
                            data-aos="fade"
                        >
                            {JSON.stringify(raw, null, 4)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NftDetails;
