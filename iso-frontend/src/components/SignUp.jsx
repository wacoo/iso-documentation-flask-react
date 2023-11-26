
const SignUp = () => {
    return (

        <div className="home-content-wrapper">
            <h1>User registration</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="fname">First name</label>
                    <input type="text"  name="fname" id="fname" placeholder="First name"/>
                    <label htmlFor="mname">Middle name</label>
                    <input type="text"  name="mname" id="mname" placeholder="Middle name"/>
                    <label htmlFor="lname">Last name</label>
                    <input type="text"  name="lname" id="lname" placeholder="Last name"/>
                    <label htmlFor="uname">User ID</label>
                    <input type="text"  name="uname" id="uname" placeholder="User ID"/>
                    <label htmlFor="pword">Password</label>
                    <input type="password"  name="pword" id="pword" placeholder="Password"/>
                    <label htmlFor="confirm">Confirm</label>
                    <input type="password"  name="confirm" id="confirm" placeholder="Confirm"/>
                    <label htmlFor="level">Access level</label>
                    <select name="level" id="level">
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrator</option>
                    </select>
                    <button type="submit">Sign up</button>    
                </form>    
            </div>
        </div>
    );
}

export default SignUp;