import img from 'assets/images/layouts/portfolio.png';
import { LINKS } from 'constants/common';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

Portfolio.propTypes = {
    data: PropTypes.array,
};

function Portfolio(props) {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/portfolio.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section className="portfolio">
            {data.heading && (
                <div className="container">
                    <div
                        className="row"
                        data-aos="fade"
                        data-aos-duration="800"
                        data-aos-anchor-placement="top"
                    >
                        <div className="col-12">
                            <div className="block-text center">
                                <h6 className="sub-heading">
                                    <span>{data.subheading}</span>
                                </h6>
                                <h3 className="heading pd">{data.heading}</h3>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6">
                            <div className="portfolio__left">
                                {data.items.map(idx => (
                                    <div
                                        key={idx.id}
                                        className="portfolio-box"
                                    >
                                        <div className="step">Step {idx.id}</div>
                                        <div className="icon">
                                            <img
                                                src={LINKS.CDN + idx.img}
                                                alt="icon"
                                            />
                                        </div>
                                        <div className="content">
                                            <h5 className="title">{idx.title}</h5>
                                            <p>{idx.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-xl-6 col-md-6">
                            <div className="portfolio__right">
                                <div
                                    className="image"
                                    data-aos="fade-left"
                                    data-aos-duration="2000"
                                >
                                    <img
                                        src={img}
                                        alt="p-right"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Portfolio;
