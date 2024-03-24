import { FILE_TYPE, LINKS } from 'constants/common';
import { Image, Spinner } from 'react-bootstrap';

export default function NftImageLoader({ image, isImageLoaded, type }) {
    if (!isImageLoaded) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: 300 }}
            >
                <Spinner
                    animation="border"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!image) {
        return (
            <Image
                src={LINKS.CDN + '/images/jpeg/noDataFound.jpeg'}
                alt="NFT"
                className="card-img-top"
                width={300}
                height={300}
            />
        );
    }

    if (type === FILE_TYPE.VIDEO) {
        return (
            <video
                controls
                className="card-img-top"
                width={300}
                height={300}
            >
                <source
                    src={image}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        );
    }

    return (
        <Image
            src={image}
            alt="NFT"
            className="card-img-top"
            width={300}
            height={300}
        />
    );
}
