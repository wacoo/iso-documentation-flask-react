import SideButton from "./SideButton";
import './SideBar.css';

const SideBar = () => {
    return (
        <div className="side-bar-wrapper">
            <SideButton text = "Home" />
            <SideButton text = "Documents" />
            <SideButton text = "Category" />
            <SideButton text = "Users" />
        </div>
    );
}

export default SideBar;