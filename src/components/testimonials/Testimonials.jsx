import { LINKS } from 'constants/common';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

Testimonials.propTypes = {
    data: PropTypes.array,
};

function Testimonials() {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/testimonials.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section className="testimonials">
            {data.heading && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="testimonials__main">
                                <div className="block-text center">
                                    <h6 className="sub-heading">
                                        <span>{data.heading}</span>
                                    </h6>
                                    <h3
                                        className="heading wow"
                                        data-splitting
                                    >
                                        {data.heading}
                                    </h3>
                                </div>

                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    className="testimonials-swiper"
                                    loop={true}
                                    modules={Pagination}
                                    pagination
                                >
                                    {data.items.map(idx => (
                                        <SwiperSlide key={idx.id}>
                                            <div className="swiper-slide">
                                                <div className="box-testimonial center">
                                                    <img
                                                        src={LINKS.CDN + idx.icon}
                                                        alt="icon"
                                                    />
                                                    <p className="text">{idx.text}</p>
                                                    <div className="info">
                                                        <img
                                                            src={LINKS.CDN + idx.avt}
                                                            alt="avatar"
                                                        />
                                                        <h5 className="name">{idx.name}</h5>
                                                        <p>{idx.position}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Testimonials;
