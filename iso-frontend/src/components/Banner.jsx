import './Banner.css'
import logo from '../img/logo.png'
import { useNavigate } from "react-router";

const Banner = ({ logoutClass }) => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('user');
        logoutClass = 'hidden';
        navigate('/sign_in');
    }
    return (
        <div className="banner-wrapper">
            <img src={logo} alt="Logo" />
            <h1>ISO DOCUMENTATION</h1>
            <a className={logoutClass} href="" onClick={(e) => handleLogout(e)}>SIGN OUT</a>
        </div>
    );
}

export default Banner;