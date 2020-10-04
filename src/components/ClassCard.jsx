import React from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/classes/classCard.css';

export default function ClassCard({ cls }) {

  const history = useHistory();

  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(<i key={i} className="fas fa-star"></i>)
  }

  return (
    <div className='class-card'>
      <img src={cls.screenshot} alt="" />
      <h5>{cls.name}</h5>
      <div className="class-card-container">
        <h4>{cls.name}</h4>
        <p>With {cls.instructor}</p>
        <ul className="star-container">{stars}</ul>
        <button onClick={() => history.push(`/classes/${cls._id}`)}>Check it out</button>
      </div>
      <div className="class-card-bg"></div>
    </div>
  )
}
