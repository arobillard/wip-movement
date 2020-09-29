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

  const rightSide = user ? (
    <div className="right-side">
      <a href={`/user/${user._id}`}>{user.username}</a>
    </div>
  ) : (
      <div className="right-side">
        <button onClick={e => redirect(e, 'login')}>Login</button>
        <button onClick={e => redirect(e, 'signup')}>Sign Up</button>
      </div>
    )

  return (
    <nav>
      <h2 onClick={e => redirect(e, '')}>Works in Progress <br /><span>Movement</span></h2>
      <div className="categories-wrapper"></div>
      <div className="search-container">
        <SearchBar list={classService.getAll} />
      </div>
      { rightSide}
    </nav >
  )
}

export default NavBar;
