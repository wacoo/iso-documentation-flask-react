
const SignIn = () => {
    return (

        <div className="home-content-wrapper">
            <h1>Sign in</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="uname">User ID</label>
                    <input type="text"  name="uname" id="uname" placeholder="User ID"/>
                    <label htmlFor="pword">Password</label>
                    <input type="password"  name="uname" id="uname" placeholder="Password"/>
                    <button type="submit">Sign in</button>    
                </form>    
            </div>
        </div>
    );
}

export default SignIn;