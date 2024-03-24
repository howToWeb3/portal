import NftCard from 'components/nftCard/NftCard';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function NftCardsRow({ nfts, slideDirection, redirectionUrl, handleLoadClick, showButton }) {
    // const renderDots = useCallback(() => {
    //     const dots = [];

    //     for (let i = 1; i <= totalPages; i++) {
    //         dots.push(
    //             <span
    //                 key={i}
    //                 className={`dot ${page === i ? 'active' : ''}`}
    //                 onClick={handleLoadClick}
    //             />,
    //         );
    //     }
    //     return dots;
    // }, [
    //     page,
    //     totalPages,
    //     handleLoadClick,
    // ]);

    if (!nfts?.length) {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="h1 text-muted fw-normal">Sorry no NFTs found. Please try again later.</div>
            </div>
        );
    }

    return (
        <>
            <div className="row z-1 position-relative">
                {nfts.map((d, index) => (
                    <NftCard
                        key={d.id}
                        data={d}
                        slideDirection={slideDirection}
                        redirectionUrl={redirectionUrl}
                    />
                ))}
            </div>
            <div className="carousel-dots">
                {showButton && (
                    <Button
                        variant="dark"
                        onClick={handleLoadClick}
                        loading={true}
                    >
                        Load More
                    </Button>
                )}
            </div>
        </>
    );
}
