import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/navbar.css';

import SearchBar from './SearchBar';
import classService from '../utils/classService';

function NavBar() {

  const history = useHistory();

  const rightSide = (
    <div className="right-side">
      <button>Login</button>
      <button>Sign Up</button>
    </div>
  )

  return (
    <nav>
      <h2 onClick={() => history.push('/')}>Works in Progress</h2>
      <div className="categories-wrapper"></div>
      <div className="search-container">
        <SearchBar list={classService.autoComplete} />
      </div>
      { rightSide}
    </nav >
  )
}

export default NavBar;
