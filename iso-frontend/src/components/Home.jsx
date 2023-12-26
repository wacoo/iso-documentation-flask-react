import Banner from "./Banner";
import HomeContent from "./HomeContent";
import SideBar from "./SideBar";
import Document from "./Document";
import './Home.css'
import Category from "./Category";
import Department from "./Deparment";
// import SignUp from "./SignUp";
import Update from "./Update";
import SignIn from "./SignIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../feature/category/categorySlice";
import { fetchDepartments } from "../feature/department/departmentSlice";
import User from "./User";

const Home = (props) => {
    const active = props.active;
    const [logoutClass, setLogoutClass] = useState('hidden');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser?.access_token);

    useEffect(() => {
    if (currentUser?.access_token) {
      setLogoutClass('logout');
    } else {
      setLogoutClass('hidden');
    }
  }, [currentUser?.access_token]);
    const renderContent = () => {
        switch (active) {
          case 'Home':
            return <HomeContent />;
          case 'Document':
            return <Document />;
          case 'Category':
            return <Category />;
          case 'Department':
            return <Department />;
          case 'User':
            return <User />;
          case 'Update':
            return <Update />;
          case 'SignIn':
            return <SignIn />;
          default:
            return null;
        }
      };

    return (
        <div className="home-wrapper">
            <Banner logoutClass={logoutClass}/>
            <div className="content-wrapper">
            {currentUser?.username && currentUser?.access_token ? (
              <>
                <SideBar />
                {renderContent()}
                {/* < HomeContent /> */}
              </>
            ) : (
              <SignIn />
            )}
            </div>

        </div>
    );
}

export default Home;