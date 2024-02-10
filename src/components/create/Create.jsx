import { LINKS } from 'constants/common';
import React, { useEffect, useState } from 'react';
import Button from '../button/Button';

function Create(props) {
    const [
        data,
        setData,
    ] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${LINKS.CDN}/locales/en/nftCreate.json`);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section className="create">
            {data.heading && (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="create__main">
                                <div className="content">
                                    <h4 className="heading">{data.heading}</h4>
                                    <p>{data.desc}</p>
                                    <Button
                                        title="Join Now"
                                        link="/contact"
                                    />
                                </div>
                                <img
                                    src={LINKS.CDN + data.createBackgroundImg}
                                    alt="background"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Create;
