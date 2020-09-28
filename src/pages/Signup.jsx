import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/loginsignup.css';

import userService from '../utils/userService';

export default function Signup({ handleLogin }) {

  const [formData, setFormData] = useState({
    username: '',
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
      let signedUp = await userService.signup(formData);
      handleLogin();
      history.push('/');
    } catch (err) {
      setErrMsg(err.message);
    }

  }

  return (
    <main className='main-signup'>
      <h1>Sign Up and Enjoy Free Classes!</h1>
      <p className="err-message">{errMsg}</p>
      <form onSubmit={handleSubmit} >
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} required />
        <div className="member">
          <p>All ready a member? </p><a href="/login">Log In!</a>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  )
}
