import React, { useState, useEffect } from 'react'
import '../../styles/admin/admin.css';

import adminService from '../../utils/adminService';

export default function Admin() {

  const [refresh, setRefresh] = useState(1);
  const [dances, setDances] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [pillates, setPillates] = useState([]);
  const [movements, setMovements] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const deleteClass = async id => {
    try {
      await adminService.deleteOneClass(id);
      setRefresh(refresh + 1);
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await adminService.getAllClasses();
        setDances(res.dances ? res.dances : []);
        setCollabs(res.collabs);
        setPillates(res.pillates);
        setMovements(res.movements);
      } catch (err) {
        setErrMsg(err.message)
      }
    }
    fetchData();
  }, [refresh])

  return (
    <main className="main-admin">
      ADMIN PAGE
      {errMsg && <p className="err-message">{errMsg}</p>}
      <h2>Dance Classes</h2>
      <AdminList list={dances} deleteClass={deleteClass} />
      <h2>Pillates Classes</h2>
      <AdminList list={pillates} deleteClass={deleteClass} />
      <h2>Collaborations</h2>
      <AdminList list={collabs} deleteClass={deleteClass} />
      <h2>Movement Breakdowns</h2>
      <AdminList list={movements} deleteClass={deleteClass} />

      <a href="/admin/new-class">New Class</a>
    </main>
  )
}

const AdminList = ({ list, deleteClass }) => {

  return (
    <ul>
      {list.map(l => <li key={l._id}>
        <a href={`/classes/${l._id}`}>{l.name}</a>
        <div className="buttons">
          <a href={`/admin/update-class/${l._id}`}>Update</a>
          <button onClick={() => deleteClass(l._id)}>Delete</button>
        </div>
      </li>)}
    </ul>
  )
}