import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../feature/user/userSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    password: '',
    access_level: '',
    active: 1,
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let access = null;
    if (data.access_level === 'viewer') {
        access = 0;
    } else if (data.access_level === 'editor') {
        access = 1;
    } else if (data.access_level === 'admin') {
        access = 2;
    }
    setData({ ...data, access_level: access });
    dispatch(registerUser(data));
  };

  return (
    <div className="home-content-wrapper">
      <h1>User registration</h1>
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
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrator</option>
          </select>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;