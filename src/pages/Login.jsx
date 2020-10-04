import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/components/loginsignup.css';
import '../styles/components/forms.css';

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
      await userService.login(formData);
      handleLogin();
      history.goBack();
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  return (
    <main className="main-login">
      <h1>Log In</h1>
      <p className="err-message">{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" value={formData.email} name="email" id="email" onChange={handleChange} required />
          <label className={`label ${formData.email ? 'typed' : ''}`} htmlFor="email">Email</label>
        </div>
        <div>
          <input type="password" value={formData.password} name="password" id="password" onChange={handleChange} required />
          <label className={`label ${formData.password ? 'typed' : ''}`} htmlFor="password">Password</label>
        </div>
        <div className="member">
          <p>Not a member? </p><a href="/signup">Sign Up!</a>
        </div>
        <button type="submit">Log In</button>
      </form>
    </main>
  )
}
