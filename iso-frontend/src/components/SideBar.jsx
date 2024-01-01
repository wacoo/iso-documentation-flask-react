import SideButton from "./SideButton";
import './SideBar.css';

const SideBar = () => {
    const user = sessionStorage.getItem('user');
	// console.log(user);
    let access_level = 0;
    if (user) {
        access_level = JSON.parse(user)?.access_level;
    }

	// console.log(access_level);
    return (
        <div className="side-bar-wrapper">
            <SideButton text = "Home" />
            { access_level > 0 && <SideButton text = "Document" /> }
            { access_level > 0 && <SideButton text = "Category" /> }
            { access_level > 0 && <SideButton text = "Department" /> }
            { access_level > 1 && <SideButton text = "User" /> }
        </div>
    );
}

export default SideBar;