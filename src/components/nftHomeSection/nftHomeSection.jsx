import dataItem from 'assets/fake-data/data-item';
import Loader from 'components/loader/Loader';
import NftCardsRow from 'components/nftCardRow/NftCardRow';
import { LINKS } from 'constants/common';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { ApiCall } from 'utils/api';

export default function NftHomeSection() {
    const cardsPerRow = 4;
    const [
        feautredNfts,
        setFeautredNfts,
    ] = useState([]);

    const [
        trendingNfts,
        setTrendingNfts,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    useEffect(() => {
        fetchFeaturedNfts();
        fetchTrendingNfts();
    }, []);

    const fetchFeaturedNfts = useCallback(async () => {
        try {
            setLoading(true);

            const payload = {
                method: 'GET',
                url: 'fetch/nfts/featured',
                encrypt: false,
                auth: false,
            };
            const response = await ApiCall(payload);

            setFeautredNfts(response.data);
        } catch (err) {
            setFeautredNfts([]);
            enqueueSnackbar('Some error occurred. Please try after some time', {
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTrendingNfts = useCallback(async () => {
        try {
            setLoading(true);

            const payload = {
                method: 'GET',
                url: 'fetch/nfts/trending',
                encrypt: false,
                auth: false,
            };
            const response = await ApiCall(payload);
            setTrendingNfts(response.data);
        } catch (err) {
            setTrendingNfts([]);
            enqueueSnackbar('Some error occurred. Please try after some time', {
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            {loading && <Loader />}
            {feautredNfts.nfts && (
                <section className="nft">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center">
                            <div className="divisions-container d-flex align-items-center">
                                <h4 className="title">
                                    <span className="title-text">Feautred</span>
                                </h4>
                            </div>
                        </div>
                        <NftCardsRow {...{ cardsPerRow, data: feautredNfts.nfts, slideDirection: 'left' }} />
                    </div>
                </section>
            )}

            {trendingNfts.nfts && (
                <section className="nft bg-black">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center">
                            <div className="divisions-container d-flex align-items-center">
                                <h4 className="title">
                                    <span className="title-text text-white">Trending</span>
                                </h4>
                            </div>
                        </div>
                        <NftCardsRow {...{ cardsPerRow, data: trendingNfts.nfts, slideDirection: 'right' }} />
                    </div>
                </section>
            )}

            {/* <section className="nft">
                <div className="container">
                    <div className="d-flex flex-column align-items-center z-1 position-relative">
                        <div className="divisions-container d-flex align-items-center">
                            <h4 className="title">
                                <span className="title-text">Mints</span>
                            </h4>
                        </div>
                    </div>
                    <NftCardsRow {...{ cardsPerRow, data: dataItem, slideDirection: 'left' }} />
                    <Image
                        src={`${LINKS.CDN}/images/png/background/alphabets-bg.png`}
                        className="header-bg-image mints"
                    />
                </div>
            </section> */}
        </>
    );
}
