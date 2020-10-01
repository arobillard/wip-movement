import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/class.css';

import ClassCard from '../components/ClassCard';
import ClassComment from '../components/ClassComment';
import Stars from '../components/Stars';

import userService from '../utils/userService';
import classService from '../utils/classService';
import tokenService from '../utils/tokenService';

export default function Class() {

  const { id } = useParams();

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);
  const [thisClass, setThisClass] = useState({});
  const [otherClasses, setOtherClasses] = useState([]);
  const [saves, setSaves] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const saveClass = async () => {
    try {
      let resp = await userService.saveClass(thisClass._id, user._id);
      if (resp.err) throw new Error(resp.err);
      tokenService.setToken(resp);
      setSaves(saves + 1);
      setIsSaved(true);
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  const changeRating = num => {
    setRating(num);
  }

  const submitComment = async e => {
    e.preventDefault();
    try {
      let resp = await classService.writeComment(thisClass._id, {
        content: comment,
        rating,
        user: user._id
      })
      setThisClass(resp);
      setComment('');
      setRating(5);
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await Promise.all([
          classService.getOne(id),
          classService.getSimilar(id, 4),
          classService.getSaves(id),
          userService.getUser()
        ]);
        let cls = res[0].class;
        cls.saves = res[0].saves
        setThisClass(res[0].class);
        setOtherClasses(res[1].classes);
        setUser(res[3]);
        setSaves(res[2].saves);
        setIsSaved(res[3].myClasses.includes(id));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    setLoading(false);
  }, [id])

  return loading ? (
    <main className="main-class">
      LOADING...
    </main>
  ) : (
      <main className="main-class">
        <div className="vid-and-details">
          <video src={thisClass.video} controls />
          <div className="details">
            <h1>{thisClass.name}</h1>
            <p className='class-description'>{thisClass.description}</p>
            <p className='class-instructor'>With: <span>{thisClass.instructor}</span></p>
            <p>{saves} members have saved this class!</p>
            {isSaved ? <p>Class Saved!</p> : <div><p>Like this class? Saved it and watch again!</p><button onClick={saveClass}>Save</button></div>}
            {errMsg && <p className="err-message">{errMsg}</p>}
          </div>
        </div>
        <h2>Comments:</h2>
        <ul className='comments-ul'>
          {thisClass.comments && thisClass.comments.sort((a, b) => b.rating - a.rating).slice(0, 5).map(c => <li key={c._id}><ClassComment cls={c} myKey={c._id} /></li>)}
          <li>
            <form onSubmit={submitComment}>
              <input type="text" value={comment} onChange={e => setComment(e.target.value)} required />
              <Stars current={rating} handleChange={changeRating} myKey={'afj1398sdfuj'} />
              <button type="submit">Comment</button>
            </form>
          </li>
        </ul>
        <h2>Check out these similar Classes!</h2>
        <ul className='other-class-ul'>
          {otherClasses.length > 0 && otherClasses.map(c => <li key={c._id} className="similar-card-wrapper"><ClassCard cls={c} /></li>)}
        </ul>
      </main>
    )
}
