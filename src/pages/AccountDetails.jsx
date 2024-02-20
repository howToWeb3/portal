import Loader from 'components/loader/Loader';
import { PATHS } from 'constants/common';
import { useAppContext } from 'context/App.context';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useMergedState from 'utils/useMergedState';
import { fetchAccountDetails, fetchTrustlines } from 'utils/xrpl.api';
import { Hashicon } from '@emeraldpay/hashicon-react';
import { TrustlinesCard } from '../components/trustlinesCard/TrustlinesCard';
import { numberWithCommas, renderValue } from '../utils/common.utils';
import SwapTokens from './SwapTokens';

function AccountDetails(props) {
    const { state: contextState } = useAppContext();
    const { address } = contextState;
    const [
        loading,
        setLoading,
    ] = useState(false);
    const navigate = useNavigate();
    const [
        accountDetails,
        setAccountDetails,
    ] = useMergedState(null);

    useEffect(() => {
        if (address) {
            getAccountDetails(address);
        } else {
            navigate(PATHS.HOME);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        address,
    ]);

    const getAccountDetails = useCallback(
        async address => {
            setLoading(true);
            const response = await fetchAccountDetails(address);
            const accountLines = await fetchTrustlines(address);

            setAccountDetails({
                ...response,
                lines: accountLines.lines,
            });
            setLoading(false);
        },
        [
            setAccountDetails,
        ],
    );

    const calculateAccountAge = useCallback(inception => {
        const inceptionDate = new Date(inception);
        const today = new Date();
        // difference in year and month
        const diffYear = today.getFullYear() - inceptionDate.getFullYear();
        const diffMonth = (12 - inceptionDate.getMonth() + today.getMonth()) % 12;
        const diffDay = today.getDate() - inceptionDate.getDate();

        if (diffYear === 0) return `${diffMonth} months`;
        if (diffMonth === 0) return `${diffDay} days`;

        return `${diffYear} years`;
    }, []);

    const handleLearnMoreClick = useCallback(() => {
        window.open(`https://www.xrpscan.com/account/${address}`, '_blank');
    }, [
        address,
    ]);

    return (
        <div className="page-account wrapper">
            {loading && <Loader />}
            <div className="container head">
                {accountDetails && (
                    <div className="d-flex flex-column align-items-center">
                        <div className="head-container d-flex justify-content-between align-items-center">
                            <h4 className="title">Account</h4>
                            <div className="btn-group">
                                <button className="btn btn-link">Sign Out</button>
                            </div>
                        </div>
                        <div className="custom-greetings">Hello, {address}</div>
                    </div>
                )}
            </div>
            <div
                className="d-flex mt-3 bg-black"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div className="container text-center">
                    {accountDetails && (
                        <div className="row acc-details text-white">
                            <div className="col-12">
                                <div className="heading pb-1">Account Details</div>
                                <div className="sub-heading">Get to know more about your account</div>
                            </div>

                            <div className="col-6">
                                <div className="hashicon-bg">
                                    <Hashicon
                                        value={address}
                                        size={300}
                                    />
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-center flex-column">
                                <div className="account-info__item">
                                    <div className="account-info__label">Account Age</div>
                                    <div className="account-info__value">
                                        {calculateAccountAge(accountDetails.inception)}
                                    </div>
                                </div>
                                <div className="account-info__item">
                                    <div className="account-info__label">Total XRP</div>
                                    <div className="account-info__value">
                                        {numberWithCommas(
                                            renderValue(
                                                accountDetails.Balance / 1000000 - (10 + accountDetails.ownerCount * 2),
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
                                <div className="account-info__item pt-4">
                                    <Link
                                        className="btn btn-primary"
                                        onClick={handleLearnMoreClick}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="d-flex mt-3 "
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div className="container">
                    <TrustlinesCard lines={accountDetails?.lines || []} />
                </div>
            </div>
            {accountDetails?.lines && <SwapTokens lines={accountDetails?.lines} />}
        </div>
    );
}

export default AccountDetails;
