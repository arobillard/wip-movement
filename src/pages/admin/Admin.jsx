import React, { useState, useEffect } from 'react'
import '../../styles/forms.css';

import NewClass from './NewClass';

import userService from '../../utils/userService';

export default function Admin() {

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userService.getUser());
  }, [])

  return user && process.env.REACT_APP_ADMINS.split(' ').includes(user._id) ? (
    <main className="main-admin">
      ADMIN PAGE
      <NewClass />
    </main>
  ) : (
      <main className="main-admin">
        <h1 style={{ color: 'red', fontSize: '10vw' }}>ACCES DENIED</h1>
      </main >
    )
}
