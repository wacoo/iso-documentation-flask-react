import { useDispatch } from "react-redux";
import { signIn } from "../feature/user/userSlice";
import Home from "./Home";
import { useEffect, useState } from "react";
import HomeContent from "./HomeContent";
import { useNavigate } from "react-router";

const SignIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
          console.log('testx');
          navigate('/categories');
        }
      }, []);
    
    return (

        <div className="home-content-wrapper">
            <h1>Sign in</h1>
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