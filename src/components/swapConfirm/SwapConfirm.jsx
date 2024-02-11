import { XAMAN_INITIAL_STATE } from 'constants/common';
import { useAppContext } from 'context/App.context';
import { enqueueSnackbar } from 'notistack';
import { Image, Modal, Spinner } from 'react-bootstrap';
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
                const payload = {
                    method: 'POST',
                    url: 'xaman/qr-generate',
                    encrypt: false,
                    auth: false,
                    data: {
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
                        Flags: OfferCreateFlags.tfFillOrKill,
                    },
                };

                if (fromTokenSelection.currency === 'XRP') {
                    payload.data.TakerGets = xrpToDrops(fromTokenInput);
                    delete payload.data.TakerGets.issuer;
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
            <Modal
                show={state.openModal}
                onHide={onModalClose}
                centered
            >
                <Modal.Body>
                    <Modal.Title
                        style={{
                            background: 'var(--primary-color)',
                            borderRadius: '20px',
                            fontSize: '30px',
                            padding: '15px',
                        }}
                    >
                        Scan using XAMAN
                    </Modal.Title>
                    <div className="d-flex align-items-center justify-content-between flex-column p-2">
                        {state.loading ? (
                            <div className="p-4">
                                <Spinner
                                    animation="border"
                                    variant="primary"
                                />
                            </div>
                        ) : (
                            <Image
                                src={state.img}
                                alt="token"
                                width="200"
                                height="200"
                            />
                        )}
                    </div>
                </Modal.Body>
            </Modal>
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
