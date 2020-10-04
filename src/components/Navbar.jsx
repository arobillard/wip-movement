import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/components/navbar.css';

import SearchBar from './SearchBar';
import classService from '../utils/classService';
import userService from '../utils/userService';

function NavBar({ navbarLoad }) {

  const [user, setUser] = useState({});

  const history = useHistory();

  const redirect = (e, where) => {
    e.preventDefault();
    history.push('/' + where);
  }

  const rightSide = user ? (
    <div className="right-side">
      {process.env.REACT_APP_ADMINS.split(' ').includes(user._id) ? <a href={`/admin`}>Admin</a> : ''}
      <a href={`/user/${user._id}`}>{user.username}</a>
    </div>
  ) : (
      <div className="right-side logged-out">
        <button onClick={e => redirect(e, 'login')}>Login</button>
        <button onClick={e => redirect(e, 'signup')}>Sign Up</button>
      </div>
    )

  useEffect(() => {
    setUser(userService.getUser());
  }, [navbarLoad])

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
