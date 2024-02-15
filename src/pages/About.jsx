import dataPortfolio from 'assets/fake-data/data-portfolio';
import dataTeam from 'assets/fake-data/dataTeam';
import img from 'assets/images/layouts/create.png';
import About2 from 'components/about/About2';
import Button from 'components/button/Button';
import Counter from 'components/counter/Counter';
import Footer from 'components/footer/Footer';
import PageTitle from 'components/pagetitle/PageTitle';
import Portfolio from 'components/portfolio/Portfolio';
import Team from 'components/team/Team';
import React from 'react';

function About(props) {
    return (
        <div className="page-about wrapper">
            <PageTitle title="About us" />

            <About2 />

            <Counter />

            <Portfolio data={dataPortfolio} />

            <Team data={dataTeam} />

            <section className="create">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="create__main">
                                <div className="content">
                                    <h4 className="heading gray">Create your NFT portfolio</h4>
                                    <p>Get udpated with news, tips & tricks</p>
                                    <Button
                                        title="Join Now"
                                        link="/contact"
                                    />
                                </div>
                                <img
                                    src={img}
                                    alt="alt"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;
