import Banner from "./Banner";
import HomeContent from "./HomeContent";
import SideBar from "./SideBar";
import Document from "./Document";
import './Home.css'
import Category from "./Category";
import Department from "./Deparment";
import SignUp from "./SignUp";
import Update from "./Update";
import SignIn from "./SignIn";

const Home = () => {
    return (
        <div className="home-wrapper">
            <Banner/>
            <div className="content-wrapper">
                <SideBar />
                <HomeContent/>
            </div>

        </div>
    );
}

export default Home;