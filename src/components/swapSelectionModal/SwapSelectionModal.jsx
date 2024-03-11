import { LINKS } from 'constants/common';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import { ApiCall } from 'utils/api';
import useDebounce from 'utils/useDebounce';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function SwapSelectionModal({ showModal, handleClick, onModalClose }) {
    const [
        searchValue,
        setSearchValue,
    ] = useState('');

    const [
        tokens,
        setTokens,
    ] = useState([]);

    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        fetchTokens(debouncedSearchValue);
    }, [
        debouncedSearchValue,
    ]);

    const fetchTokens = async name => {
        try {
            const res = await ApiCall({
                url: '/xrpl/tokens',
                method: 'GET',
                params: {
                    name,
                },
            });

            setTokens([
                {
                    ticker: 'XRP',
                    currency: 'XRP',
                    issuer: null,
                    icon: LINKS.XRP_ICON,
                },
                ...res.data,
            ]);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error fetching tokens', { variant: 'error' });
        }
    };

    useEffect(() => {
        if (showModal) {
            setSearchValue('');
        }
    }, [
        showModal,
    ]);

    const onSearchChange = value => {
        setSearchValue(value);
    };

    const onClose = () => {
        onModalClose();
    };

    return (
        <Modal
            show={showModal}
            onHide={onClose}
            dialogClassName="swap-selection-modal"
            centered
        >
            <Modal.Body>
                <div className="dropdown">
                    <input
                        placeholder="Search token"
                        type="text"
                        className="form-control"
                        value={searchValue}
                        onChange={e => onSearchChange(e.target.value)}
                    />
                    <ul className="w-100 overflow-auto selection-ul">
                        {tokens?.length > 0 ? (
                            tokens.map((trustline, index) => (
                                <li key={index}>
                                    <a
                                        onClick={() => handleClick(trustline)}
                                        className="dropdown-item p-2"
                                    >
                                        <Image
                                            src={trustline.icon}
                                            width="20"
                                            className="me-2"
                                        />
                                        {trustline.ticker}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item p-2 text-center">
                                <a>No tokens found</a>
                            </li>
                        )}
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
}
