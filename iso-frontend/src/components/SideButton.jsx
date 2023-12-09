import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { fetchCategories } from "../feature/category/categorySlice";
import { setActive } from "../feature/user/userSlice";
import { useNavigate } from "react-router";

const SideButton = ({text}) => {
    //const active = useSelector((state) => state.categories.activeMenu) ?? [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (name) => {
        switch (name) {
            case 'Home':
                // dispatch(setActive('Home'));
                navigate("/");
                break;
            case 'Document':
                // dispatch(setActive('Document'));
                navigate("/documents/new");
                break;
            case 'Department':
                navigate("/departments");
                // dispatch(setActive('Department'));
                break;
            case 'Category':
                navigate("/categories");
                // dispatch(setActive('Category'));
                break;
            case 'User':
                navigate("/sign_up");
                // dispatch(setActive('User'));
                break;
                case 'SignIn':
                    navigate("/sign_in");
                    // dispatch(setActive('User'));
                    break;
            default:
                console.log('Default')
        }
    }

    return (
        <div className="side-button-wrapper">
            <button className="side-button" onClick={() => handleClick(text)}>{text}</button>
        </div>
    );
}

export default SideButton;