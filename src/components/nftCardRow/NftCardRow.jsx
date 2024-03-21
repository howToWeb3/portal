import NftCard from 'components/nftCard/NftCard';
import React, { useState } from 'react';

export default function NftCardsRow({ cardsPerRow, data, slideDirection }) {
    const [
        currentDot,
        setCurrentDot,
    ] = useState(0);
    const totalDots = Math.ceil(data.length / cardsPerRow);

    const handleDotClick = index => {
        setCurrentDot(index);
    };

    if (!data.length) {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="h1 text-muted fw-normal">Sorry no data found. Try again later.</div>
            </div>
        );
    }

    return (
        <>
            <div className="row z-1 position-relative">
                {data.slice(currentDot * cardsPerRow, currentDot * cardsPerRow + cardsPerRow).map((d, index) => (
                    <NftCard
                        key={d.id}
                        data={d}
                        slideDirection={slideDirection}
                    />
                ))}
            </div>
            <div className="carousel-dots">
                {Array.from({ length: totalDots }, (_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentDot === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </>
    );
}
