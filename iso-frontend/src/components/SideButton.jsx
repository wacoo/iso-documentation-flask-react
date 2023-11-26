import Home from "./Home";

const SideButton = ({text}) => {

    const handleClick = (name) => {
        switch (name) {
            case 'Home':
                break;
            case 'Document':
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