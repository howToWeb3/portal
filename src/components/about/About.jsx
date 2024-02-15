import { LINKS } from 'constants/common';
import React, { useEffect, useState } from 'react';
import Button from '../button/Button';

function About(props) {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/about.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section className="about">
            {data.blockText && (
                <div
                    className="container"
                    data-aos="fade-down"
                    data-aos-duration="800"
                    data-aos-anchor-placement="top-bottom"
                >
                    <div className="row rev">
                        <div className="col-xl-6 col-md-12">
                            <div className="about__right">
                                <div className="images">
                                    {data.images.map(idx => (
                                        <img
                                            key={idx.id}
                                            className={idx.class}
                                            src={LINKS.CDN + idx.img}
                                            alt="img"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="block-text">
                                <h6 className="sub-heading">
                                    <span>{data.blockText.subheading}</span>
                                </h6>
                                <h3 className="heading gray-heading">{data.blockText.heading}</h3>
                                <p className="mb-17">{data.blockText.desc1}</p>
                                <p className="mb-26">{data.blockText.desc2}</p>
                                <Button
                                    link="/about"
                                    title="More About Us"
                                    black={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default About;
