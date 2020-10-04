import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import '../styles/profile.css';

import ProfileClassCard from '../components/ProfileClassCard';

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
  }, [id])


  return (
    <main className="main-profile">
      <div className="title">
        <h1>{user.username}</h1>
        {errMsg && <p className="err-message">{errMsg}</p>}
        <div className="hr"></div>
      </div>
      <h3>My Classes:</h3>
      <ul className="profile-class-list">
        {classes.length > 0 ? classes.map(c => <ProfileClassCard key={c._id} cls={c} unSave={unSave} history={history} />) : <p>No Classes saved yet!</p>}
      </ul>
      <p onClick={logOut} className="logout-p">Sign Out</p>
    </main>
  )
}
