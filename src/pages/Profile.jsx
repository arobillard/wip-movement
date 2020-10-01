import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import '../styles/profile.css';

import classService from '../utils/classService';
import tokenService from '../utils/tokenService';
import userService from '../utils/userService';

export default function Profile() {

  const { id } = useParams();

  const [user, setUser] = useState({});
  const [classes, setClasses] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const history = useHistory();

  const unSave = async id => {
    try {
      let unSaved = await userService.unSaveClass(id, user._id);
      tokenService.setToken(unSaved.token);
      setUser(unSaved.newUser);
      let newClasses = await classService.getUserClasses(unSaved.newUser.myClasses);
      setClasses(newClasses.classes);
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  const logOut = async () => {
    history.push('/logout');
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await Promise.all([
        userService.getUser(id),
      ])
      let classList = await classService.getUserClasses(res[0].myClasses)
      setUser(res[0]);
      setClasses(classList.classes);
    }
    fetchData();
  }, [])


  return (
    <main className="main-profile">
      {user.username}'s PROFILE PAGE
      <h3>My Classes:</h3>
      <ul>
        {classes.length > 0 ? classes.map(c => <li key={c._id}>{c.name}<button onClick={() => unSave(c._id)}>Unsave</button></li>) : <p>No Classes saved yet!</p>}
      </ul>
      <p onClick={logOut} className="logout-p">Sign Out</p>
    </main>
  )
}
