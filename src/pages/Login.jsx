import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/loginsignup.css';

import userService from '../utils/userService';

export default function Login({ handleLogin }) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errMsg, setErrMsg] = useState('');

  const history = useHistory();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let loggedIn = await userService.login(formData);
      handleLogin();
      history.push('/');
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  return (
    <main className="main-login">
      <h1>Log In</h1>
      <p className="err-message">{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" value={formData.email} name="email" id="email" onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input type="password" value={formData.password} name="password" id="password" onChange={handleChange} required />
        <div className="member">
          <p>Not a member? </p><a href="/signup">Sign Up!</a>
        </div>
        <button type="submit">Log In</button>
      </form>
    </main>
  )
}
