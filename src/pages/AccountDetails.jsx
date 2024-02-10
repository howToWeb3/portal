import dataItem from 'assets/fake-data/data-item';
import Footer from 'components/footer/Footer';
import Nfts from 'components/nfts/Nft';
import PageTitle from 'components/pagetitle/PageTitle';
import { PATHS } from 'constants/common';
import { useAppContext } from 'context/App.context';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMergedState from 'utils/useMergedState';
import { fetchAccountDetails } from 'utils/xrpl.api';
import { numberWithCommas, renderValue } from '../utils/common.utils';

function AccountDetails(props) {
    const { state: contextState } = useAppContext();
    const { address } = contextState;
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
            const response = await fetchAccountDetails(address);
            console.log(response);
            setAccountDetails(response);
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

        if (diffYear === 0) {
            return `${diffMonth} months`;
        }

        if (diffMonth === 0) {
            return `${diffDay} days`;
        }

        return `${diffYear} years`;
    }, []);

    return (
        <div className="page-account wrapper">
            <PageTitle
                title="Account Details"
                breadcrumb={address}
            />
            <div className="container">
                {accountDetails && (
                    <div
                        className="banner-box"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                    >
                        <div className="top">
                            <h4 className="title">{numberWithCommas(0)} MB589</h4>
                            <div className="btn-group">
                                <button className="btn btn-primary">Get More</button>
                            </div>
                        </div>
                        <div className="main">
                            <div className="info">
                                <p>Current XRP Balance</p>
                                <h4>{renderValue(accountDetails.xrpBalance - (10 + 2 * accountDetails.ownerCount))}</h4>
                                {/* <p>$8,154.36</p> */}
                            </div>
                            <div className="info">
                                <p>Account Age</p>
                                <h4>{calculateAccountAge(accountDetails.inception)}</h4>
                            </div>
                            {/* <div className="info">
                                <p>MemeFTs Count</p>
                                <h4>{renderValue(0)}</h4>
                            </div> */}
                            <div className="info">
                                <p>Initial XRP Balance</p>
                                <h4>{renderValue(accountDetails.initial_balance)}</h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Nfts data={dataItem} />
            <Footer />
        </div>
    );
}

export default AccountDetails;
