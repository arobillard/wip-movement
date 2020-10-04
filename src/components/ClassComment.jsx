import React from 'react'

import Stars from '../components/Stars';

export default function ClassComment({ cls, myKey }) {
  return (
    <div className="comment-container">
      <p>{cls.content}</p>
      <div>
        <Stars current={cls.rating} myKey={myKey} />
        {cls.user && <a href={`/user/${cls.user._id}`}>{cls.user.username}</a>}
      </div>
    </div>
  )
}
