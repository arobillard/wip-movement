import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import userService from './utils/userService';

import NavBar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

import Home from './pages/Home';
import Class from './pages/Class';
import Search from './pages/Search';

export default function App() {

  const [user, setUser] = useState({});

  const handleLogin = () => {
    setUser(userService.getUser());
  }

  useEffect(() => {
    setUser(userService.getUser());
  }, [])
  return (
    <BrowserRouter>
      <header>
        <NavBar user={user} handleLogin={handleLogin} />
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/classes/:id' component={Class} />
        <Route path='/search/:search' component={Search} />

        <Route path='/login' render={({ history }) => <Login history={history} handleLogin={handleLogin} />} />
        <Route path='/signup' render={({ history }) => <Signup history={history} handleLogin={handleLogin} />} />
      </Switch>
    </BrowserRouter>
  )
}
