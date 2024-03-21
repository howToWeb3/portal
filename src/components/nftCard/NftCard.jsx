import { LINKS } from 'constants/common';
import { Image } from 'react-bootstrap';
import { IpfsImage } from 'react-ipfs-image';
import { Link } from 'react-router-dom';

export default function NftCard({ data, slideDirection }) {
    return (
        <div
            key={data.id}
            className="col-xl-3 col-md-6"
            data-aos={`flip-${slideDirection}`}
            data-aos-duration="2000"
        >
            <div className="nft-item">
                <div className="card-media">
                    <Link to="#">
                        <IpfsImage hash={data.image} />
                    </Link>
                </div>
                <div className="card-title">
                    <Link
                        to="#"
                        className="h5"
                    >
                        {data.name}
                    </Link>
                </div>
                <div className="card-bottom style-explode">
                    <div className="price">
                        <Image
                            className="icon"
                            src={LINKS.XRP_ICON}
                            width={35}
                            height={35}
                            alt="icon"
                        />
                        <div className="price-details">
                            <span> Current Bid</span>
                            <h6>0.45 XRP</h6>
                        </div>
                    </div>
                    <div className="button-place-bid">
                        <Link
                            to=""
                            data-toggle="modal"
                            data-target="#popup_bid"
                            className="sc-button"
                        >
                            <span>Place Bid</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
