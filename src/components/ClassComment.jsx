import React from 'react'

import Stars from '../components/Stars';

export default function ClassComment({ cls, myKey }) {
  return (
    <div className="comment-container">
      <p>{cls.content}</p>
      <Stars current={cls.rating} myKey={myKey} />
    </div>
  )
}
