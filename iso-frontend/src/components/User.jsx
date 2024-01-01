import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../feature/category/categorySlice";
import { registerUser } from "../feature/user/userSlice";

const User = () => {
    const dispatch = useDispatch();
    const [msg, setMsg] = useState('');
    const [notifClass, setNotifClass] = useState('no_notif');
    const [notifId, setNotifId] = useState('no_notif');
    const [load, setLoad] = useState(false);
    const [data, setData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        username: '',
        password: '',
        access_level: '0',
        active: 1,
    });

    const usr = sessionStorage.getItem('user');
    let access_level = 0;
    if (usr) {
        access_level = JSON.parse(usr)?.access_level;
    }

    const user = useSelector((state) => state.user.user) ?? '';

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let access = null;
        if (data.access_level === '0') {
            access = 0;
        } else if (data.access_level === '1') {
            access = 1;
        } else if (data.access_level === '2') {
            access = 2;
        }
        setData({ ...data, access_level: access });
        dispatch(registerUser(data));
        setLoad(true);
    };

    useEffect(() => {
        if (load) {
            if (user.message) {
                setMsg(user.message);
                setNotifClass('notification');
                setNotifId('success');
            } else {
                // setMsg('User creation failed! make sure there is no empty field.');
                setMsg(user.message);
                setNotifClass('notification');
                setNotifId('failure');
            }
            setLoad(false);
            // dispatch(fetchCategories());
            resetResult();
        }        
    }, [dispatch, user]);

    const resetResult = () => {
        setTimeout(() => {
            setMsg('');
            setNotifClass('no_notif');
            setNotifId('no_notif');
        }, 5000)
    }

    if (access_level < 2) {
        return (
            <div className="home-content-wrapper">
                <h1>ERROR:401</h1>
                <div className="input">
                    <p>Sorry, you don't have access to this page!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="home-content-wrapper">
            <div className={notifClass}>
                <p id={notifId}>{msg}</p>
            </div>
            <h1>NEW USER</h1>
            <div className="input">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">First name</label>
                    <input
                        type="text"
                        name="first_name"
                        id="fname"
                        placeholder="First name"
                        value={data.first_name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="mname">Middle name</label>
                    <input
                        type="text"
                        name="middle_name"
                        id="mname"
                        placeholder="Middle name"
                        value={data.middle_name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lname">Last name</label>
                    <input
                        type="text"
                        name="last_name"
                        id="lname"
                        placeholder="Last name"
                        value={data.last_name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="uname">User ID</label>
                    <input
                        type="text"
                        name="username"
                        id="uname"
                        placeholder="User ID"
                        value={data.username}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="pword">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="pword"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="confirm">Confirm</label>
                    <input
                        type="password"
                        name="confirm"
                        id="confirm"
                        placeholder="Confirm"
                    />
                    <label htmlFor="level">Access level</label>
                    <select
                        name="access_level"
                        id="level"
                        value={data.access_level}
                        onChange={handleInputChange}
                    >
                        <option value="0">Viewer</option>
                        <option value="1">Editor</option>
                        <option value="2">Administrator</option>
                    </select>
                    <button type="submit" className="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default User;