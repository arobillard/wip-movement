import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'

export default function Mobile({ user }) {

  const [showing, setShowing] = useState(false);

  return (
    <>
      <div className={`burger-container ${showing ? 'showing' : ''}`} onClick={() => setShowing(!showing)}>
        <div className='burger'>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </div>
      <div className={`mobile-menu ${showing ? 'showing' : ''}`}>
        <a href="/">Home</a>
        {user ? <a href={`/user/${user._id}`}>{user.username}</a> :
          <>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </>
        }
      </div>
    </>
  )
}
