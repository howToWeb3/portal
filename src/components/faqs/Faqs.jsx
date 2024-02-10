import { LINKS } from 'constants/common';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap-accordion';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

Faqs.propTypes = {
    data: PropTypes.array,
};

function Faqs() {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/faq.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section className="faq">
            <div className="shape right"></div>
            {data.heading && (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="block-text center"
                                data-aos="fade-down"
                                data-aos-duration="3000"
                            >
                                <h6 className="sub-heading">
                                    <span>{data.subheading}</span>
                                </h6>
                                <h3 className="heading">{data.heading}</h3>
                                <p className="mb-17">{data.desc1}</p>
                                <p>{data.desc2}</p>
                            </div>

                            <div className="faq__main flat-tabs">
                                <Tabs>
                                    <TabList className="menu-tab">
                                        {data.tabs.map(idx => (
                                            <Tab
                                                className="fs-14 h6"
                                                key={idx.id}
                                            >
                                                {idx.title}
                                            </Tab>
                                        ))}
                                    </TabList>
                                    {data.faqs.map(idx => (
                                        <TabPanel
                                            key={idx.id}
                                            className="content-tab"
                                        >
                                            <div className="content-inner">
                                                <div className="flat-accordion row">
                                                    <div className="col-md-6 col-sm-12">
                                                        {data.faqs.slice(0, 4).map(idx => (
                                                            <Accordion
                                                                show={idx.show}
                                                                key={idx.id}
                                                                title={idx.title}
                                                                className="flat-toggle h6"
                                                            >
                                                                <p className="toggle-content">{idx.text} </p>
                                                            </Accordion>
                                                        ))}
                                                    </div>

                                                    <div className="col-md-6 col-sm-12">
                                                        {data.faqs.slice(4, 8).map(idx => (
                                                            <Accordion
                                                                show={idx.show}
                                                                key={idx.id}
                                                                title={idx.title}
                                                                className="flat-toggle h6"
                                                            >
                                                                <p className="toggle-content">{idx.text} </p>
                                                            </Accordion>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    ))}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Faqs;
