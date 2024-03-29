import React, { useState } from 'react';
import Button from '../button/Button';

function Token(props) {
    const [
        dataBlock,
    ] = useState({
        subheading: 'Token Information',
        heading: 'Here’s what you need to know about NFT',
        desc: 'Sunt in culpa qui officia dese runt mollit anim id est laborum velit esse cillum dolore eu fugiat nulla pariatu epteur sint occaecat',
    });
    return (
        <section className="token">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                        <div className="block-text pd-0">
                            <h6 className="sub-heading">
                                <span>{dataBlock.subheading}</span>
                            </h6>
                            <h3 className="heading">{dataBlock.heading}</h3>
                            <p className="mb-17">{dataBlock.desc}</p>
                            <Button
                                title="Buy Token"
                                link="#"
                            />
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div
                            className="token__main"
                            data-aos="fade-left"
                            data-aos-duration="2000"
                        >
                            <ul className="token-list">
                                <li>
                                    <div className="name">
                                        <svg
                                            width="12"
                                            height="16"
                                            viewBox="0 0 12 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.49933 4C8.49933 4.66304 8.23594 5.29893 7.7671 5.76777C7.29826 6.23661 6.66237 6.5 5.99933 6.5C5.33629 6.5 4.70041 6.23661 4.23157 5.76777C3.76273 5.29893 3.49933 4.66304 3.49933 4C3.49933 3.33696 3.76273 2.70107 4.23157 2.23223C4.70041 1.76339 5.33629 1.5 5.99933 1.5C6.66237 1.5 7.29826 1.76339 7.7671 2.23223C8.23594 2.70107 8.49933 3.33696 8.49933 4V4ZM1 13.412C1.02142 12.1002 1.55756 10.8494 2.49278 9.92936C3.42801 9.00929 4.68739 8.49365 5.99933 8.49365C7.31127 8.49365 8.57066 9.00929 9.50588 9.92936C10.4411 10.8494 10.9772 12.1002 10.9987 13.412C9.43026 14.1312 7.72477 14.5023 5.99933 14.5C4.21533 14.5 2.522 14.1107 1 13.412Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p>Name</p>
                                    </div>
                                    <h6>Al Mahmud</h6>
                                </li>
                                <li>
                                    <div className="name">
                                        <svg
                                            width="12"
                                            height="16"
                                            viewBox="0 0 12 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.49933 4C8.49933 4.66304 8.23594 5.29893 7.7671 5.76777C7.29826 6.23661 6.66237 6.5 5.99933 6.5C5.33629 6.5 4.70041 6.23661 4.23157 5.76777C3.76273 5.29893 3.49933 4.66304 3.49933 4C3.49933 3.33696 3.76273 2.70107 4.23157 2.23223C4.70041 1.76339 5.33629 1.5 5.99933 1.5C6.66237 1.5 7.29826 1.76339 7.7671 2.23223C8.23594 2.70107 8.49933 3.33696 8.49933 4V4ZM1 13.412C1.02142 12.1002 1.55756 10.8494 2.49278 9.92936C3.42801 9.00929 4.68739 8.49365 5.99933 8.49365C7.31127 8.49365 8.57066 9.00929 9.50588 9.92936C10.4411 10.8494 10.9772 12.1002 10.9987 13.412C9.43026 14.1312 7.72477 14.5023 5.99933 14.5C4.21533 14.5 2.522 14.1107 1 13.412Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p>Flatform</p>
                                    </div>
                                    <h6>Cyfonii</h6>
                                </li>
                                <li>
                                    <div className="name">
                                        <svg
                                            width="12"
                                            height="16"
                                            viewBox="0 0 12 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.49933 4C8.49933 4.66304 8.23594 5.29893 7.7671 5.76777C7.29826 6.23661 6.66237 6.5 5.99933 6.5C5.33629 6.5 4.70041 6.23661 4.23157 5.76777C3.76273 5.29893 3.49933 4.66304 3.49933 4C3.49933 3.33696 3.76273 2.70107 4.23157 2.23223C4.70041 1.76339 5.33629 1.5 5.99933 1.5C6.66237 1.5 7.29826 1.76339 7.7671 2.23223C8.23594 2.70107 8.49933 3.33696 8.49933 4V4ZM1 13.412C1.02142 12.1002 1.55756 10.8494 2.49278 9.92936C3.42801 9.00929 4.68739 8.49365 5.99933 8.49365C7.31127 8.49365 8.57066 9.00929 9.50588 9.92936C10.4411 10.8494 10.9772 12.1002 10.9987 13.412C9.43026 14.1312 7.72477 14.5023 5.99933 14.5C4.21533 14.5 2.522 14.1107 1 13.412Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p>Total Supply</p>
                                    </div>
                                    <h6>100'000tokens</h6>
                                </li>
                                <li>
                                    <div className="name">
                                        <svg
                                            width="12"
                                            height="16"
                                            viewBox="0 0 12 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.49933 4C8.49933 4.66304 8.23594 5.29893 7.7671 5.76777C7.29826 6.23661 6.66237 6.5 5.99933 6.5C5.33629 6.5 4.70041 6.23661 4.23157 5.76777C3.76273 5.29893 3.49933 4.66304 3.49933 4C3.49933 3.33696 3.76273 2.70107 4.23157 2.23223C4.70041 1.76339 5.33629 1.5 5.99933 1.5C6.66237 1.5 7.29826 1.76339 7.7671 2.23223C8.23594 2.70107 8.49933 3.33696 8.49933 4V4ZM1 13.412C1.02142 12.1002 1.55756 10.8494 2.49278 9.92936C3.42801 9.00929 4.68739 8.49365 5.99933 8.49365C7.31127 8.49365 8.57066 9.00929 9.50588 9.92936C10.4411 10.8494 10.9772 12.1002 10.9987 13.412C9.43026 14.1312 7.72477 14.5023 5.99933 14.5C4.21533 14.5 2.522 14.1107 1 13.412Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p>ICO supply</p>
                                    </div>
                                    <h6>60'000 tokens</h6>
                                </li>
                                <li>
                                    <div className="name">
                                        <svg
                                            width="12"
                                            height="16"
                                            viewBox="0 0 12 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.49933 4C8.49933 4.66304 8.23594 5.29893 7.7671 5.76777C7.29826 6.23661 6.66237 6.5 5.99933 6.5C5.33629 6.5 4.70041 6.23661 4.23157 5.76777C3.76273 5.29893 3.49933 4.66304 3.49933 4C3.49933 3.33696 3.76273 2.70107 4.23157 2.23223C4.70041 1.76339 5.33629 1.5 5.99933 1.5C6.66237 1.5 7.29826 1.76339 7.7671 2.23223C8.23594 2.70107 8.49933 3.33696 8.49933 4V4ZM1 13.412C1.02142 12.1002 1.55756 10.8494 2.49278 9.92936C3.42801 9.00929 4.68739 8.49365 5.99933 8.49365C7.31127 8.49365 8.57066 9.00929 9.50588 9.92936C10.4411 10.8494 10.9772 12.1002 10.9987 13.412C9.43026 14.1312 7.72477 14.5023 5.99933 14.5C4.21533 14.5 2.522 14.1107 1 13.412Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p>Token Price</p>
                                    </div>
                                    <h6>0.25€ / 0.29 USD</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Token;
