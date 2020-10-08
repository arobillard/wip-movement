import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';

import FeaturedHome from '../components/FeaturedHome';
import ClassCard from '../components/ClassCard';
import DirectorMsg from '../components/DirectorMsg';

import classService from '../utils/classService';

export default function Home() {

  const [randomClasses, setRandomClasses] = useState([]);
  const [errMsg, setErrMsg] = useState([]);

  const videoRef = useRef(null);

  const mute = e => {
    e.preventDefault();
    e.target.volume = e.target.volume > 0 ? 0 : 0.1;
  }

  useEffect(() => {
    const fetchClasses = async () => {
      videoRef.current.volume = 0.1;
      videoRef.current.play();
      try {
        let res = await classService.getRandom(4);
        setRandomClasses(res.classes);

      } catch (err) {
        setErrMsg(err.message);
      }
    }
    fetchClasses();
  }, [])

  return (
    <main className="main-home">
      {/* <FeaturedHome /> */}
      <a href="/classes/5f7f56f37770250004d8384e">
        <img className="featured-img" src="images/halloween-collab-blank.jpeg" alt="" />
        <h3>Looking for something to do this weekend?</h3>
        <div>
          <h4>Check out our first Collab to Thriller!</h4>
          <video onClick={mute} ref={videoRef} src="images/video-1602184430.mp4" loop />
        </div>
      </a>
      <h3>Fun Classes for all skill levels!</h3>
      <div className="hr" />
      {errMsg && <p className="err-message">{errMsg}</p>}
      <ul className="random-list">
        {randomClasses.map(c => <li key={c._id}><ClassCard cls={c} myKey={c._id} /></li>)}
      </ul>
      <DirectorMsg />
    </main>
  )
}
