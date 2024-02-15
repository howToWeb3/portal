import dataFaqs from 'assets/fake-data/data-faq';
import dataItem from 'assets/fake-data/data-item';
import Faq3 from 'components/faqs/Faq3';
import Footer from 'components/footer/Footer';
import PageTitle from 'components/pagetitle/PageTitle';
import Project2 from 'components/project/Project2';
import Roadmap from 'components/roadmap/Roadmap';
import React from 'react';

function RoadMap() {
    return (
        <div className="page-roadmap wrapper">
            <PageTitle title="Road Map" />

            <Roadmap />

            <Project2 data={dataItem} />

            <Faq3 data={dataFaqs} />
            <Footer />
        </div>
    );
}

export default RoadMap;
