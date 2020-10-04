import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../../styles/admin/adminTable.css';

import adminService from '../../utils/adminService';
import UpdateClass from './components/UpdateClass';

export default function UpdateClassPage() {

  const { id } = useParams();

  const [cls, setCls] = useState({});
  const [errMsg, setErrMsg] = useState('');

  return (
    <main className="main-update-form">
      <h1>Update Class</h1>
      {errMsg && <p className="err-message">{errMsg}</p>}
      <UpdateClass />
    </main>
  )
}
