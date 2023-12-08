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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../feature/category/categorySlice";
import { fetchDepartments } from "../feature/department/departmentSlice";
import User from "./User";

const Home = () => {
    const active = useSelector((state) => state.user.activeMenu) ?? [];
      
    const renderContent = () => {
        switch (active) {
          case 'Home':
            return <HomeContent />;
          case 'Document':
            return <Document />;
          case 'Category':
            return <Category />;
          case 'Department':
            console.log('dept...');
            return <Department />;
          case 'User':
            console.log('sign...');
            return <User />;
          case 'Update':
            return <Update />;
          case 'SignIn':
            return <SignIn />;
          default:
            console.log('waiting...');
            return null;
        }
      };

    return (
        <div className="home-wrapper">
            <Banner/>
            <div className="content-wrapper">
                <SideBar />
                {renderContent()}
                {/* <Document /> */}
            </div>

        </div>
    );
}

export default Home;