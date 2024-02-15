import { LINKS } from 'constants/common';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

Project.propTypes = {
    data: PropTypes.array,
};

function Project(props) {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/project.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section className="project">
            {data.title && (
                <div className="container">
                    <div
                        className="row"
                        data-aos="fade-down"
                        data-aos-duration="800"
                        data-aos-anchor-placement="top"
                    >
                        <div className="col-12">
                            <div className="block-text center">
                                <h6 className="sub-heading">
                                    <span>{data.subtitle}</span>
                                </h6>
                                <h3 className="heading gray-heading">{data.title}</h3>
                            </div>

                            <Swiper
                                className="project-swiper"
                                spaceBetween={30}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    991: {
                                        slidesPerView: 3,
                                    },
                                }}
                                loop={true}
                                modules={[
                                    Navigation,
                                    Pagination,
                                ]}
                                navigation
                                pagination={{
                                    clickable: true,
                                }}
                            >
                                {data.items.map(idx => (
                                    <SwiperSlide key={idx.id}>
                                        <div className="swiper-slide">
                                            <div className="project-box">
                                                <div className="image">
                                                    <Link to="/nfts">
                                                        <img
                                                            src={LINKS.CDN + idx.img}
                                                            alt="nft"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="content">
                                                    <Link
                                                        to="/nfts"
                                                        className="h5 title"
                                                    >
                                                        {idx.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Project;
