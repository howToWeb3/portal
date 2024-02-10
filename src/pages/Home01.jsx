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
import { PATHS } from 'constants/common';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useXaman from 'utils/useXaman';

function Home01() {
    const { autoLogin } = useXaman();
    const navigate = useNavigate();

    useEffect(() => {
        async function login() {
            try {
                const isAutoLoginAllowed = await autoLogin();
                if (isAutoLoginAllowed) {
                    navigate(PATHS.HOME);
                }
            } catch (err) {}
        }
        login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
