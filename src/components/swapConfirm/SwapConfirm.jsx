import XamanScanModal from 'components/xamanScanModal/XamanScanModal';
import { XAMAN_INITIAL_STATE } from 'constants/common';
import { useAppContext } from 'context/App.context';
import { enqueueSnackbar } from 'notistack';
import { validateFields } from 'utils/swap-tokens.utils';
import useMergedState from 'utils/useMergedState';
import useXaman from 'utils/useXaman';
import { OfferCreateFlags, xrpToDrops } from 'xrpl';

export default function SwapConfirm({
    fromTokenInput,
    toTokenInput,
    fromTokenSelection,
    toTokenSelection,
    setErrors,
    resetAllValues,
}) {
    const { handleCreateOrder } = useXaman();
    const { state: contextState } = useAppContext();
    const [
        state,
        setState,
    ] = useMergedState({ ...XAMAN_INITIAL_STATE });

    const onModalClose = () => {
        setState({ ...XAMAN_INITIAL_STATE });
    };

    const handleConfirmSwap = async () => {
        if (!contextState.address) {
            enqueueSnackbar('Please connect your wallet', { variant: 'error' });
            return;
        }

        const isValid = validateFields({
            fromTokenSelection,
            toTokenSelection,
            fromTokenInput,
            toTokenInput,
            setErrors,
        });

        try {
            if (isValid) {
                const xrplPayload = {
                    TransactionType: 'OfferCreate',
                    Account: contextState.address,
                    TakerGets: {
                        currency: fromTokenSelection.currency,
                        issuer: fromTokenSelection.account,
                        value: parseFloat(fromTokenInput),
                    },
                    TakerPays: {
                        currency: toTokenSelection.currency,
                        issuer: toTokenSelection.account,
                        value: parseFloat(toTokenInput),
                    },
                    // Flags: OfferCreateFlags.tfFillOrKill,
                };

                const payload = {
                    method: 'POST',
                    url: 'xaman/qr-generate',
                    encrypt: false,
                    auth: false,
                    data: xrplPayload,
                };

                if (fromTokenSelection.currency === 'XRP') {
                    payload.data.TakerGets = xrpToDrops(fromTokenInput);
                    delete payload.data.TakerGets.issuer;
                }

                if (contextState.xamanToken) {
                    payload.data.XamanToken = contextState.xamanToken;
                }

                if (toTokenSelection.currency === 'XRP') {
                    payload.data.TakerPays = xrpToDrops(toTokenInput);
                    delete payload.data.TakerPays.issuer;
                }
                await handleCreateOrder(payload, setState);
            } else {
                enqueueSnackbar('Invalid input', { variant: 'error' });
            }
        } catch (error) {
            console.error('Swap Failed', error);
            enqueueSnackbar('Uh oh! Some error occurred. Please try again.', { variant: 'error' });
        } finally {
            resetAllValues();
            onModalClose();
        }
    };

    return (
        <>
            <XamanScanModal
                show={state.openModal}
                onHide={onModalClose}
                heading="Scan QR"
                img={state.img}
                instructions={[
                    'Open Xaman Wallet',
                    'Click the middle icon at the bottom',
                    'Scan the QR code',
                    'Approve the Sign In transaction',
                ]}
            />
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-primary btn-lg "
                    onClick={handleConfirmSwap}
                >
                    Confirm Swap
                </button>
            </div>
        </>
    );
}
