import { LINKS } from 'constants/common';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from '../button/Button';

Roadmap.propTypes = {
    data: PropTypes.array,
};

function Roadmap() {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/roadmap.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    if (!data.heading) return null;

    return (
        <section className="roadmap">
            <img
                src={LINKS.CDN + data.bgLineImg}
                alt="bg-line"
                className="img-line"
            />

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="block-text center">
                            <h6 className="sub-heading">
                                <span>{data.subheading}</span>
                            </h6>
                            <h3 className="heading pd gray-heading">{data.heading}</h3>
                        </div>
                        <div
                            className="roadmap__main"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            {data.items.map(idx => (
                                <div
                                    key={idx.id}
                                    className={`roadmap-box ${idx.class}`}
                                >
                                    <div className="time">{idx.time}</div>
                                    <div className="content">
                                        <h5 className="title">{idx.title}</h5>
                                        <p className="text">{idx.desc}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="icon"></div>
                            <div className="icon bottom"></div>
                        </div>
                        <div className="button">
                            <Button
                                title={data.fullRoadMapBtnText}
                                link="/road-map"
                                black={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Roadmap;
