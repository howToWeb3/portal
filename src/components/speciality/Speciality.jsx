import { LINKS } from 'constants/common';
import React, { useEffect, useState } from 'react';

function Speciality() {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/speciality.json`);
            const data = await response.json();
            setData(data);
        }

        fetchData();
    }, []);

    return (
        <section className="speciality">
            <div className="shape right"></div>
            {data.heading && (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="block-text center">
                                <h6 className="sub-heading">
                                    <span>{data.subheading}</span>
                                </h6>
                                <h3 className="heading pd">{data.heading}</h3>
                                <p className="">{data.desc}</p>
                            </div>
                        </div>
                        {data.items.map(idx => (
                            <div
                                key={idx.id}
                                className="col-xl-3 col-md-6"
                            >
                                <div className="speciality-box">
                                    <div className="icon">
                                        <img
                                            src={LINKS.CDN + idx.img}
                                            alt="icon"
                                        />
                                    </div>
                                    <h5 className="title">{idx.title}</h5>
                                    <p>{idx.desc}</p>
                                    <h3 className="number">0{idx.id}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Speciality;
