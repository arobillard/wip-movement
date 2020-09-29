import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classService from '../utils/classService';

export default function Search() {

  const { search } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log(search)
      try {
        const data = await classService.getSearch(search);
        console.log(data);
        setList(data.classes);
      } catch (err) {
        console.log('here')
        setErrMsg(err.message)
      }
    }
    fetchData();
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <main className="main-search">
        LOADING..
      </main>
    )
  } else {
    return (
      <main className="main-search">
        <p className="err-message">{errMsg}</p>
        <ul>
          {list.map(c => <li key={c._id}>{c.name}</li>)}
        </ul>
      </main>
    )
  }
}
