import './Banner.css'
import logo from '../img/logo.png'
const Banner = () => {
    return (
        <div className="banner-wrapper">
            <img src={logo} alt="Logo" />
            <h1>ISO DOCUMENTATION</h1>
        </div>
    );
}

export default Banner;