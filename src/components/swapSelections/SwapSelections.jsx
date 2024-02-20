import { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function SwapSelections({
    fromTokenSelection,
    toTokenSelection,
    fromTokenInput,
    toTokenInput,
    handleInputChange,
    handleSelectionBtnClick,
    handleReverseTokenValues,
}) {
    const [
        swapIconClick,
        setSwapIconClick,
    ] = useState(false);
    const onCustomeSwapIconClick = () => {
        setSwapIconClick(!swapIconClick);
        handleReverseTokenValues();
    };

    return (
        <div className="d-flex flex-column col-12 col-md-6 pb-5">
            <div className="d-flex align-items-center justify-content-between pb-4 p-2">
                <h5 className="title">
                    {toTokenSelection?.ticker && fromTokenSelection?.ticker
                        ? `${fromTokenSelection.ticker} / ${toTokenSelection.ticker}`
                        : 'Select tokens'}
                </h5>
                <OverlayTrigger
                    trigger={[
                        'hover',
                        'focus',
                    ]}
                    placement="auto"
                    overlay={
                        <Tooltip
                            id="info-tooltip"
                            className="bg-gray"
                        >
                            To use swap, you need to have trustlines with the tokens you want to swap.
                        </Tooltip>
                    }
                >
                    <button className="btn btn-secondary btn-sm">
                        Info <i className="bi bi-info border border-white rounded-circle"></i>
                    </button>
                </OverlayTrigger>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex w-100 selection-flex">
                    <div className="col-8 column-full">
                        <input
                            type="text"
                            className="form-control form-control-lg selection-input"
                            placeholder="Enter amount"
                            value={fromTokenInput}
                            onChange={e => handleInputChange(e, 'from')}
                        />
                    </div>
                    <Button
                        className="w-100 selection-btn"
                        variant="light"
                        onClick={() => handleSelectionBtnClick('from')}
                    >
                        {fromTokenSelection?.ticker || 'Select Token'}
                    </Button>
                </div>
                <i
                    className={`bi bi-arrow-down-up h5 m-2 customeSwapIcon ${swapIconClick ? 'rotate' : ''}`}
                    onClick={onCustomeSwapIconClick}
                ></i>
                <div className="d-flex w-100 selection-flex">
                    <div className="col-8 column-full">
                        <input
                            type="text"
                            className="form-control form-control-lg selection-input cursor-not-allowed"
                            placeholder="Swap amount"
                            disabled
                            value={toTokenInput}
                        />
                    </div>
                    <Button
                        className="w-100 selection-btn"
                        variant="light"
                        onClick={() => handleSelectionBtnClick('to')}
                    >
                        {toTokenSelection?.ticker || 'Select Token'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
