import React from 'react'

export default function ProfileClassCard({ cls, unSave, history }) {

  return (
    <li className='profile-class-card' onClick={() => history.push(`/classes/${cls._id}`)}>
      <div className="profile-class-card-wrapper">
        <div className="left">
          <h3>{cls.name}</h3>
          <p>With: {cls.instructor}</p>
        </div>
        <div className="right">
          <p>{cls.description}</p>
          <p className="search-tags">Tags: {cls.tags.join(', ')}</p>
        </div>
        <div className="buttons">
          <button onClick={() => unSave(cls._id)}>Unsave</button>
        </div>
      </div>
    </li>
  )
}
