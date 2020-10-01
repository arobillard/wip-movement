import React from 'react'

export default function Stars({ current, handleChange, myKey }) {

  let stars = new Array(current).fill(true);
  while (stars.length < 5) {
    stars.push(false);
  }

  return handleChange ? (
    <ul className="stars-ul changing">
      {stars.map((s, i) => <li key={myKey + i} onClick={() => handleChange(i + 1)}>{s ? <i className="fas fa-star yellow"></i> : <i className="fas fa-star"></i>}</li>)}
    </ul>
  ) : (
      <ul className="stars-ul">
        {stars.map((s, i) => <li key={myKey + i}>{s ? <i className="fas fa-star yellow"></i> : <i className="fas fa-star"></i>}</li>)}
      </ul>
    )
}
