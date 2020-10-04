import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/components/loginsignup.css';
import '../styles/components/forms.css';

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
      await userService.signup(formData);
      handleLogin();
      history.push('/');
    } catch (err) {
      setErrMsg(err.message);
    }

  }

  return (
    <main className='main-signup'>
      <h1>Sign Up and Enjoy for Free!</h1>
      <p className="err-message">{errMsg}</p>
      <div className="signup-disclaimer">
        <p>The Works in Progress Movement website contains dance and Pilates classes that can be done in your own home, or environment of your choosing, without the supervision of an instructor. </p>
        <p>By signing up and using this website, you acknowledge and agree that you have been assessed by a qualified medical professional who has given you consent to take part in physical activity. Regular exercise is not always without risk, even for healthy individuals. You are responsible for your own health and safety at all times. </p>
        <p>It is important that while participating in classes, you listen to your body and only do what feels right for you.</p>
      </div>
      <form onSubmit={handleSubmit} >
        <div>
          <input type="text" name="username" id="username" onChange={handleChange} required />
          <label htmlFor="username" className={`label ${formData.username ? 'typed' : ''}`}>Full Name</label>
        </div>
        <div>
          <input type="email" name="email" id="email" onChange={handleChange} required />
          <label htmlFor="email" className={`label ${formData.email ? 'typed' : ''}`}>Email</label>
        </div>
        <div>
          <input type="password" name="password" id="password" onChange={handleChange} required />
          <label htmlFor="password" className={`label ${formData.password ? 'typed' : ''}`}>Password</label>
        </div>
        <div className="member">
          <p>All ready a member? </p><a href="/login">Log In!</a>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </main >
  )
}
