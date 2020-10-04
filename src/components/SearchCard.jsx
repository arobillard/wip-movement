import React from 'react'

export default function SearchCard({ cls, history }) {

  const goToClass = id => {
    history.push(`/classes/${id}`);
  }

  return (
    <li className="search-card" onClick={() => goToClass(cls._id)}>
      <div className="left">
        <h3>{cls.name}</h3>
        <p>With {cls.instructor}</p>
      </div>
      <div className="right">
        <p>{cls.description}</p>
        <p className="search-tags">Tags: {cls.tags.join(', ')}</p>
      </div>
    </li>
  )
}
