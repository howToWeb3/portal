import About from 'components/about/About';
import Banner from 'components/banner/Banner';
import Create from 'components/create/Create';
import Faqs from 'components/faqs/Faqs';
import Portfolio from 'components/portfolio/Portfolio';
import Project from 'components/project/Project';
import Roadmap from 'components/roadmap/Roadmap';
import Speciality from 'components/speciality/Speciality';
import Team from 'components/team/Team';
import Testimonials from 'components/testimonials/Testimonials';

function Home01() {
    return (
        <div className="home-1 wrapper">
            <Banner />
            <About />
            <Speciality />
            <Portfolio />
            <Project />
            <Roadmap />
            <Team />
            <Testimonials />
            <Faqs />
            <Create />
        </div>
    );
}

export default Home01;
