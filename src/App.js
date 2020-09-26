import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import NavBar from './components/Navbar';

import Home from './pages/Home';
import Class from './pages/Class';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/classes/:id' component={Class} />
      </Switch>
    </BrowserRouter>
  )
}
