import SideButton from "./SideButton";
import './SideBar.css';

const SideBar = () => {
    return (
        <div className="side-bar-wrapper">
            <SideButton text = "Home" />
            <SideButton text = "Document" />
            <SideButton text = "Category" />
            <SideButton text = "Department" />
            <SideButton text = "User" />
        </div>
    );
}

export default SideBar;