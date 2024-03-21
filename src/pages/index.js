import { PATHS } from 'constants/common';
import About from './About';
import AccountDetails from './AccountDetails';
import AdvisorsBackers from './AdvisorsBackers';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import Contact from './Contact';
import HelpCenter from './HelpCenter';
import Home01 from './Home01';
import Home02 from './Home02';
import Home03 from './Home03';
import NftDetails from './NftDetails';
import Nfts from './Nfts';
import ParticipantAssets from './ParticipantAssets';
import Partners from './Partners';
import RoadMap from './RoadMap';
import Team from './Team';
import VisionsMission from './VisionsMission';

const routes = [
    { path: PATHS.HOME, component: <Home01 /> },
    { path: PATHS.HOME_V2, component: <Home02 /> },
    { path: PATHS.HOME_V3, component: <Home03 /> },
    { path: PATHS.NFTS, component: <Nfts /> },
    { path: PATHS.BLOG, component: <Blog /> },
    { path: PATHS.BLOG_DETAILS, component: <BlogDetails /> },
    { path: PATHS.VISIONS_MISSION, component: <VisionsMission /> },
    { path: PATHS.HELP_CENTER, component: <HelpCenter /> },
    { path: PATHS.PARTICIPANTS_ASSETS, component: <ParticipantAssets /> },
    { path: PATHS.ADVISORS_BACKERS, component: <AdvisorsBackers /> },
    { path: PATHS.PARTNERS, component: <Partners /> },
    { path: PATHS.ABOUT, component: <About /> },
    { path: PATHS.ROAD_MAP, component: <RoadMap /> },
    { path: PATHS.TEAM, component: <Team /> },
    { path: PATHS.CONTACT, component: <Contact /> },
    { path: PATHS.ACCOUNT_DETAILS, component: <AccountDetails /> },
    { path: PATHS.NFT_DETAILS, component: <NftDetails /> },
];

export default routes;
