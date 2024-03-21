import Loader from 'components/loader/Loader';
import NftCardsRow from 'components/nftCardRow/NftCardRow';
import NftHomeSection from 'components/nftHomeSection/nftHomeSection';
import { LINKS } from 'constants/common';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { ApiCall } from 'utils/api';
import useDebounce from 'utils/useDebounce';

function Nfts() {
    const [
        searchInput,
        setSearchInput,
    ] = useState('');

    const [
        searchResults,
        setSearchResults,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const debouncedSearchInput = useDebounce(searchInput, 500);

    useEffect(() => {
        fetchSearchResults(debouncedSearchInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        debouncedSearchInput,
    ]);

    const fetchSearchResults = useCallback(async searchInput => {
        try {
            if (!searchInput || searchInput.length === 0) {
                setSearchResults([]);
                return;
            }

            setLoading(true);

            const payload = {
                method: 'GET',
                url: 'fetch/nfts',
                encrypt: false,
                auth: false,
                params: {
                    name: searchInput,
                },
            };
            const response = await ApiCall(payload);
            setSearchResults(response.data);
        } catch (err) {
            enqueueSnackbar('Some error occurred. Please try after some time', {
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="wrapper page-nfts">
            {loading && <Loader />}
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

            <section className="search">
                <div className="container">
                    <form
                        id="nft-form"
                        onSubmit={e => e.preventDefault()}
                    >
                        <div className="search-container d-flex align-items-center justify-content-center">
                            <input
                                type="text"
                                placeholder="Search NFTs"
                                className="search-input"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </section>

            {debouncedSearchInput.length > 0 && searchResults.nfts ? (
                <section className="nft">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center">
                            <div className="divisions-container d-flex align-items-center">
                                <h4 className="title">
                                    <span className="title-text">Explore</span>
                                </h4>
                            </div>
                        </div>
                        <NftCardsRow {...{ cardsPerRow: 8, data: searchResults.nfts, slideDirection: 'left' }} />
                    </div>
                </section>
            ) : (
                <NftHomeSection />
            )}
        </div>
    );
}

export default Nfts;
