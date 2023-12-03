import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { fetchCategories, setActive } from "../feature/category/categorySlice";

const SideButton = ({text}) => {
    //const active = useSelector((state) => state.categories.activeMenu) ?? [];
    const dispatch = useDispatch();

    const handleClick = (name) => {
        switch (name) {
            case 'Home':
                dispatch(setActive('Home'));
                break;
            case 'Document':
                dispatch(setActive('Document'));
                break;
            case 'Department':
                dispatch(setActive('Department'));
                break;
            case 'Category':
                dispatch(setActive('Category'));
                break;
            case 'User':
                dispatch(setActive('User'));
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