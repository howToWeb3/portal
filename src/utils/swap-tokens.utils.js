import { enqueueSnackbar } from 'notistack';

export function calculatePrice({ orderbook, currency1, currency2, isReversed }) {
    // Extracting the best offers for buying
    if (!orderbook) return 0;

    if (
        (orderbook.buy.length === 0 && orderbook.sell.length === 0) ||
        (isReversed && orderbook.sell.length === 0) ||
        (!isReversed && orderbook.buy.length === 0)
    ) {
        enqueueSnackbar('No offers found', { variant: 'warning' });
        return 0;
    }

    let exchangeRate = 0;
    const bestOrder = isReversed ? orderbook.sell[0] : orderbook.buy[0];

    if (currency1.currency === 'XRP' || currency2.currency === 'XRP') {
        if (orderbook.sell.length !== 0) {
            exchangeRate = bestOrder.quality * 1000000;
        }

        if (typeof bestOrder.TakerGets === 'string' && currency2.currency === 'XRP') return 1 / exchangeRate;
        return exchangeRate;
    }

    if (orderbook.sell.length !== 0) {
        exchangeRate = bestOrder.quality;
    }

    if (bestOrder.TakerGets.currency === currency1.currency) {
        exchangeRate = 1 / exchangeRate;
    }
    return parseFloat(exchangeRate).toFixed(4);
}

export function validateFields({ fromTokenSelection, toTokenSelection, fromTokenInput, toTokenInput, setErrors }) {
    return () => {
        let isValid = true;
        const errors = {
            fromToken: '',
            toToken: '',
        };

        if (fromTokenInput === '') {
            errors.fromToken = 'Please enter a valid amount';
            isValid = false;
        }
        if (toTokenInput === '') {
            errors.toToken = 'Please enter a valid amount';
            isValid = false;
        }

        if (fromTokenInput > 1000) {
            errors.fromToken = 'Amount should be less than your balance';
            isValid = false;
        }
        if (toTokenInput > 1000) {
            errors.toToken = 'Amount should be less than your balance';
            isValid = false;
        }

        if (fromTokenSelection.currency === toTokenSelection.currency) {
            errors.toToken = 'Please select a different token';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };
}
