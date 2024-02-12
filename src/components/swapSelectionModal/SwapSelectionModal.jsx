import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function SwapSelectionModal({ showModal, handleClick, userTrustlines, onModalClose }) {
    const [
        searchValue,
        setSearchValue,
    ] = useState('');

    const [
        tokens,
        setTokens,
    ] = useState([]);

    useEffect(() => {
        if (showModal) {
            setTokens(userTrustlines);
            setSearchValue('');
        }
    }, [
        showModal,
        userTrustlines,
    ]);

    const onSearchChange = value => {
        setSearchValue(value);
        // filter the list of tokens
        const filteredTokens = userTrustlines.filter(token => token.ticker.toLowerCase().includes(value.toLowerCase()));
        setTokens(filteredTokens);
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
