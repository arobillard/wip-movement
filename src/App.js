import React, { useState, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import NavBar from './components/Navbar';

import Signup from './pages/Signup';
import Login from './pages/Login';

import Home from './pages/Home';
import Class from './pages/Class';
import Search from './pages/Search';
import Profile from './pages/Profile';

import Admin from './pages/admin/Admin';
import NewClassPage from './pages/admin/NewClassPage';
import UpdateClassPage from './pages/admin/UpdateClassPage';

import userService from './utils/userService';
import tokenService from './utils/tokenService';

export default function App() {

  const [user, setUser] = useState({});
  const [banner, setBanner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [navbarLoad, setNavbarLoad] = useState(0);

  const loginLogout = () => {
    setUser(userService.getUser());
    setNavbarLoad(navbarLoad + 1);
  }

  const removeBanner = () => {
    tokenService.setBanner();
    setBanner(false);
  }

  useEffect(() => {
    setUser(userService.getUser());
    setLoading(false);
    setBanner(tokenService.checkBanner());
  }, [])
  return (
    <BrowserRouter>
      <header>
        {!loading && banner &&
          <div className={`banner ${banner ? 'banner-showing' : ''}`}>
            <div className="main-banner">
              <h2>This is a test banner. Enroll in a Live Class Today!</h2>
            </div>
            <p onClick={removeBanner}>X</p>
          </div>
        }
        <NavBar navbarLoad={navbarLoad} />
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/classes/:id' render={() => (
          user ? <Class /> : <Redirect to='/login' />)} />
        <Route path='/search/:search' render={() => (
          user ? <Search /> : <Redirect to='/login' />)} />
        <Route path='/user/:id' render={() => (
          user ? <Profile /> : <Redirect to='/login' />)} />

        <Route path='/login' render={({ history }) => <Login history={history} handleLogin={loginLogout} />} />
        <Route path='/signup' render={({ history }) => <Signup history={history} handleLogin={loginLogout} />} />
        <Route path='/logout' render={({ history }) => {
          userService.logout();
          loginLogout();
          history.push('/');
        }} />

        {/* ======================================================================
                ADMIN STUFF
        ======================================================================*/}

        <Route exact path='/admin' render={() => (
          admin ? <Admin /> : <main><h1 style={{ color: 'red', fontSize: '10vw' }}>ACCES DENIED</h1></main>)} />
        <Route path='/admin/new-class' render={() => (
          admin ? <NewClassPage /> : <main><h1 style={{ color: 'red', fontSize: '10vw' }}>ACCES DENIED</h1></main>)} />
        <Route path='/admin/update-class/:id' render={() => (
          admin ? <UpdateClassPage /> : <main><h1 style={{ color: 'red', fontSize: '10vw' }}>ACCES DENIED</h1></main>)} />

        <Route path='/*' render={() => <main className="not-found">404 Page not Found</main>} />
      </Switch>
      <footer>
        <p>Have any questions or concerns? Send us an email and we'll get back to you as soon as possible!</p>
        <a href="mailto:worksinprogressmovement@gmail.com?subject=URGENT FROM SITE" target="_blank" rel="noopener noreferrer">EMAIL US</a>
        <p>&copy; Tim Robillard 2020</p>
      </footer>
    </BrowserRouter>
  )
  function admin() {
    return user && process.env.REACT_APP_ADMINS.split(' ').includes(user._id)
  }
}

