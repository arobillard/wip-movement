import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/navbar.css';

import SearchBar from './SearchBar';
import classService from '../utils/classService';
import userService from '../utils/userService';
import { sign } from 'jsonwebtoken';

function NavBar({ user, handleLogin }) {

  const history = useHistory();

  const redirect = (e, where) => {
    e.preventDefault();
    history.push('/' + where);
  }

  const signout = e => {
    e.preventDefault();
    userService.logout();
    handleLogin();
    history.push('/')
  }

  const rightSide = user ? (
    <div className="right-side">
      <span>{user.username}</span>
      <p onClick={signout}>Log Out</p>
    </div>
  ) : (
      <div className="right-side">
        <button onClick={e => redirect(e, 'login')}>Login</button>
        <button onClick={e => redirect(e, 'signup')}>Sign Up</button>
      </div>
    )

  return (
    <nav>
      <h2 onClick={e => redirect(e, '')}>Works in Progress Movement</h2>
      <div className="categories-wrapper"></div>
      <div className="search-container">
        <SearchBar list={classService.getAll} />
      </div>
      { rightSide}
    </nav >
  )
}

export default NavBar;
