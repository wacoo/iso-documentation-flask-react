import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../feature/user/userSlice";
import Home from "./Home";
import { useEffect, useState } from "react";
import HomeContent from "./HomeContent";
import { useNavigate } from "react-router";

const SignIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [notifClass, setNotifClass] = useState('no_notif');
    const [notifId, setNotifId] = useState('no_notif');
    const error = useSelector((state) => state.user.error) ?? '';
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
        username: formData.get('uname'),
        password: formData.get('pword'),
        };

        dispatch(signIn(data))
        .then(result => {
            if (result.payload.access_token) {
                setIsLoggedIn(true);
            } else {
                setMsg('Login failed! make sure the user id or password is correct.');
                setNotifClass('notification');
                setNotifId('failure');
                resetResult();
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
          navigate('/');
        }
      }, [isLoggedIn]);
    

      const resetResult = () => {
        setTimeout(() => {
            setMsg('');
            setNotifClass('no_notif');
            setNotifId('no_notif');
        }, 5000)
    }

    return (

        <div className="home-content-wrapper">
            <div className={notifClass}>
                <p id={notifId}>{msg}</p>
            </div>
            <h1>SIGN IN</h1>
            <div className="input">
                <form onSubmit={handleSubmit}>
                <label htmlFor="uname">User ID</label>
                <input type="text" name="uname" id="uname" placeholder="User ID" />
                <label htmlFor="pword">Password</label>
                <input type="password" name="pword" id="pword" placeholder="Password" />
                <button type="submit" className="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;