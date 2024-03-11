import SwapConfirm from 'components/swapConfirm/SwapConfirm';
import SwapSelectionModal from 'components/swapSelectionModal/SwapSelectionModal';
import SwapSelections from 'components/swapSelections/SwapSelections';
import { REGEX } from 'constants/common';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { calculatePrice } from 'utils/swap-tokens.utils';
import useMergedState from 'utils/useMergedState';
import { Client } from 'xrpl';

export default function SwapTokens() {
    const [
        reverseTokenValues,
        setReverseTokenValues,
    ] = useState(false);

    const [
        fromTokenInput,
        setFromTokenInput,
    ] = useState('');
    const [
        toTokenInput,
        setToTokenInput,
    ] = useState('');
    const [
        fromTokenSelection,
        setFromTokenSelection,
    ] = useState({});
    const [
        toTokenSelection,
        setToTokenSelection,
    ] = useState({});

    const [
        showModal,
        setShowModal,
    ] = useState(false);

    const [
        type,
        setType,
    ] = useState('');

    const [
        price,
        setPrice,
    ] = useState(0);

    const [
        errors,
        setErrors,
    ] = useMergedState({ fromToken: '', toToken: '' });

    useEffect(() => {
        if (fromTokenSelection.currency && toTokenSelection.currency) {
            fetchPrice(fromTokenSelection, toTokenSelection);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        fromTokenSelection,
        toTokenSelection,
    ]);

    const resetAllValues = useCallback(() => {
        setFromTokenInput('');
        setToTokenInput('');
        setFromTokenSelection({});
        setPrice(0);
        setToTokenSelection({});
        setErrors({ fromToken: '', toToken: '' });
        setReverseTokenValues(!reverseTokenValues);
    }, [
        setErrors,
        reverseTokenValues,
    ]);

    const fetchPrice = useCallback(
        async (t1, t2) => {
            try {
                if (!(t1.currency || t1.issuer || t2.currency || t2.issuer)) return;

                if (t1.currency === t2.currency) {
                    enqueueSnackbar('Token values cannot be the same', { variant: 'warning' });
                    resetAllValues();
                    return;
                }

                let currency1 =
                    t1.currency === 'XRP' ? { currency: 'XRP' } : { currency: t1.currency, issuer: t1.issuer };
                let currency2 =
                    t2.currency === 'XRP' ? { currency: 'XRP' } : { currency: t2.currency, issuer: t2.issuer };

                const client = new Client(import.meta.env.VITE_XRPL_WS_URL);
                await client.connect();
                const orderbook = await client.getOrderbook(currency1, currency2);

                const exchangeRate = calculatePrice({
                    orderbook: orderbook,
                    currency1,
                    currency2,
                    isReversed: reverseTokenValues,
                });
                setPrice(exchangeRate);
                setToTokenInput((exchangeRate * fromTokenInput).toFixed(4));

                await client.disconnect();
            } catch (error) {
                console.error(error);
                enqueueSnackbar(error.message || 'Error fetching price', { variant: 'error' });
            }
        },
        [
            fromTokenInput,
            setToTokenInput,
            reverseTokenValues,
            resetAllValues,
        ],
    );

    const handleReverseTokenValues = () => {
        setReverseTokenValues(true);
        setFromTokenSelection(toTokenSelection);
        setToTokenSelection(fromTokenSelection);
        setFromTokenInput(toTokenInput);
        setToTokenInput(fromTokenInput);
        setErrors({ fromToken: '', toToken: '' });
    };

    const handleInputChange = (e, type) => {
        const input = e.target.value;

        if (!REGEX.NUMBER_PATTERN.test(input)) {
            return;
        }

        if (type === 'from') {
            setErrors({ fromToken: '' });
            setReverseTokenValues(false);
            setFromTokenInput(input);
            setToTokenInput((input * price).toFixed(4));
        }
    };

    const handleSelectionBtnClick = type => {
        setShowModal(true);
        setType(type);
    };

    const handleSelectionClick = trustline => {
        if (type === 'from') {
            setFromTokenInput('');
            setFromTokenSelection(trustline);
        } else {
            setToTokenInput('Fetching price...');
            setToTokenSelection(trustline);
        }
        setShowModal(false);
        setReverseTokenValues(false);
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="page-swap wrapper d-flex justify-content-center mt-3">
            <SwapSelectionModal
                {...{
                    showModal,
                    handleClick: handleSelectionClick,
                    onModalClose,
                }}
            />
            <div
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div className="row p-2 custom-container align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                        <h2 className="swap-title">Swap</h2>
                        <h5 className="swap-subtitle">Exchange your tokens</h5>
                    </div>
                    <SwapSelections
                        {...{
                            fromTokenSelection,
                            toTokenSelection,
                            fromTokenInput,
                            toTokenInput,
                            handleInputChange,
                            handleSelectionBtnClick,
                            handleReverseTokenValues,
                        }}
                    />
                    <div className="d-flex flex-column col-12 col-md-6">
                        <p className="swap-description">
                            Swap is a feature that allows you to exchange one token for another based on your
                            trustlines. We use XRPL Orderbooks to find the best price for you. The swap feature is
                            powered by the XRPL DEX and is non-custodial which means you are always in control of your
                            funds.
                        </p>
                        <SwapConfirm
                            {...{
                                fromTokenInput,
                                toTokenInput,
                                fromTokenSelection,
                                toTokenSelection,
                                setErrors,
                                resetAllValues,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
