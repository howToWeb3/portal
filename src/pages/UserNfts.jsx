import Loader from 'components/loader/Loader';
import NftCardsRow from 'components/nftCardRow/NftCardRow';
import { PATHS } from 'constants/common';
import { useAppContext } from 'context/App.context';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { ApiCall } from 'utils/api';

export default function UserNfts() {
    const [
        nfts,
        setNfts,
    ] = useState([]);
    const [
        marker,
        setMarker,
    ] = useState(null);

    const { state: contextState } = useAppContext();

    const [
        loading,
        setLoading,
    ] = useState(false);

    useEffect(() => {
        fetchAccountNfts();
    }, []);

    const fetchAccountNfts = useCallback(async () => {
        try {
            setLoading(true);

            const payload = {
                method: 'GET',
                url: 'account/nfts',
                encrypt: false,
                auth: false,
                params: {
                    address: contextState.address,
                    limit: 24,
                    marker,
                },
            };
            const response = await ApiCall(payload);

            setNfts([
                ...nfts,
                ...response.data.nfts,
            ]);

            setMarker(response?.data?.marker);
        } catch (err) {
            setNfts([]);
            enqueueSnackbar('Some error occurred. Please try after some time', {
                variant: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [
        nfts,
        contextState.address,
        marker,
    ]);

    return (
        <>
            {loading && <Loader />}
            {nfts && (
                <section className="nft">
                    <div className="container">
                        <NftCardsRow
                            {...{
                                nfts,
                                slideDirection: 'left',
                                redirectionUrl: PATHS.NFT_DETAILS,
                                showButton: marker ? true : false,
                                handleLoadClick: fetchAccountNfts,
                            }}
                        />
                    </div>
                </section>
            )}
        </>
    );
}
