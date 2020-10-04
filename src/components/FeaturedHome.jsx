import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import classService from '../utils/classService';

export default function FeaturedHome() {

  const [featured, setFeatured] = useState({});
  const [errMsg, setErrMsg] = useState('');

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await classService.getFeatured();
        setFeatured(resp.featured);
      } catch (err) {
        setErrMsg(err.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="featured-container" >
      <img src="images/halloween-collab.png" alt="" />
      {/* <div className="featured-card">
        <span className="featured-card-title">{featured.name}</span>
        <p>{featured.description}</p>
        <span className='featured-card-instructor'>With {featured.instructor}
          <button onClick={() => history.push(`/classes/${featured._id}`)}>Check it out</button>
        </span>
      </div>
      <p className="err-message">{errMsg}</p> */}
    </div>
  )
}
