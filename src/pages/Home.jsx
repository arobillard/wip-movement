import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';

import FeaturedHome from '../components/FeaturedHome';
import ClassCard from '../components/ClassCard';
import DirectorMsg from '../components/DirectorMsg';

import classService from '../utils/classService';

export default function Home() {

  const [randomClasses, setRandomClasses] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const [muted, setMuted] = useState(false);

  const videoRef = useRef(null);

  const mute = e => {
    e.preventDefault();
    videoRef.current.volume = videoRef.current.volume > 0 ? 0 : 0.1;
    setMuted(!muted);
  }

  useEffect(() => {
    const fetchClasses = async () => {
      videoRef.current.volume = 0.1;
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
      <a href="https://www.instagram.com/worksinprogressmovement/?hl=en" className="insta">
        <img src="/images/oct-banner.png" alt="" />
      </a>
      <a className="thriller" href="/classes/5f7f56f37770250004d8384e">
        <img src="images/thriller-01.png" alt="" />
        <div onClick={mute} >
          <video ref={videoRef} autoPlay loop mute >
            <source src="images/video-1602184430.mp4" type="video/mp4" />
          </video>
          {/* <span><i class={`fas ${muted ? 'fa-volume-up' : 'fa-volume-mute'}`}></i></span> */}
        </div>
        {/* <div className="mobile-mute" onClick={mute}><i class={`fas ${muted ? 'fa-volume-up' : 'fa-volume-mute'}`}></i></div> */}
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
