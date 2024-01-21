import dataBlog from 'assets/fake-data/data-blog';
import dataBox from 'assets/fake-data/data-box';
import dataFaqs from 'assets/fake-data/data-faq';
import dataRoadMap from 'assets/fake-data/data-roadmap';
import dataTestimonials from 'assets/fake-data/data-testimonials';
import dataProject from 'assets/fake-data/dataProject';
import dataTeam from 'assets/fake-data/dataTeam';
import About3 from 'components/about/About3';
import Banner3 from 'components/banner/Banner3';
import Blog from 'components/blog/Blog';
import Counter from 'components/counter/Counter';
import Faq3 from 'components/faqs/Faq3';
import Footer from 'components/footer/Footer';
import Project from 'components/project/Project';
import Roadmap2 from 'components/roadmap/Roadmap2';
import Speciality from 'components/speciality/Speciality';
import Team2 from 'components/team/Team2';
import Testimonials from 'components/testimonials/Testimonials';
import Token from 'components/token/Token';
import React from 'react';

function Home03(props) {
    return (
        <div className="home-3 wrapper">
            <Banner3 />

            <About3 />

            <Token />

            <Project data={dataProject} />

            <Roadmap2 data={dataRoadMap} />

            <Team2 data={dataTeam} />

            <Speciality data={dataBox} />

            <Testimonials data={dataTestimonials} />

            <Counter />

            <Blog data={dataBlog} />

            <Faq3 data={dataFaqs} />

            <Footer />
        </div>
    );
}

export default Home03;
