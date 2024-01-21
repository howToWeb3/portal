import dataFaqs from 'assets/fake-data/data-faq';
import data from 'assets/fake-data/dataPartner';
import Faqs from 'components/faqs/Faqs';
import Footer from 'components/footer/Footer';
import PageTitle from 'components/pagetitle/PageTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

Partners.propTypes = {};

function Partners(props) {
    return (
        <div className="wrapper">
            <PageTitle title="Partners & Investors" />

            <section className="partner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block-text center">
                                <h3 className="heading">Partners & Investors</h3>
                            </div>

                            <Swiper
                                className="brands-swiper"
                                spaceBetween={30}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    991: {
                                        slidesPerView: 6,
                                    },
                                }}
                                loop={true}
                            >
                                {data.slice(0, 6).map(idx => (
                                    <SwiperSlide key={idx.id}>
                                        <a href="#">
                                            <img
                                                src={idx.img}
                                                alt="cyfonii"
                                            />
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                className="brands-swiper"
                                spaceBetween={30}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    991: {
                                        slidesPerView: 6,
                                    },
                                }}
                                loop={true}
                            >
                                {data.slice(0, 6).map(idx => (
                                    <SwiperSlide key={idx.id}>
                                        <a href="#">
                                            <img
                                                src={idx.img}
                                                alt="cyfonii"
                                            />
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                className="brands-swiper"
                                spaceBetween={30}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    991: {
                                        slidesPerView: 6,
                                    },
                                }}
                                loop={true}
                            >
                                {data.slice(0, 6).map(idx => (
                                    <SwiperSlide key={idx.id}>
                                        <a href="#">
                                            <img
                                                src={idx.img}
                                                alt="cyfonii"
                                            />
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                className="brands-swiper"
                                spaceBetween={30}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    991: {
                                        slidesPerView: 6,
                                    },
                                }}
                                loop={true}
                            >
                                {data.slice(0, 6).map(idx => (
                                    <SwiperSlide key={idx.id}>
                                        <a href="#">
                                            <img
                                                src={idx.img}
                                                alt="cyfonii"
                                            />
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            <Faqs data={dataFaqs} />

            <Footer />
        </div>
    );
}

export default Partners;
