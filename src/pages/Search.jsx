import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import '../styles/search/search.css';

import SearchCard from '../components/SearchCard';

import classService from '../utils/classService';
import userService from '../utils/userService';

export default function Search() {

  const { search } = useParams();
  const history = useHistory();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await classService.getSearch(search);
        setList(data.classes);
      } catch (err) {
        setErrMsg(err.message)
      }
    }
    fetchData();
    setUser(userService.getUser());
    setLoading(false);
  }, [search])

  if (loading) {
    return (
      <main className="main-search">
        LOADING..
      </main>
    )
  } else {
    return user ? (
      <main className="main-search">
        <h2>Searching for: ' {search} '..</h2>
        <p className="err-message">{errMsg}</p>
        <ul>
          {list.length > 0 ? list.map(c => <SearchCard key={c._id} cls={c} history={history} />) :
            <>
              <span className="bigger-p">No results matched that search..</span>
              <p className="no-results"><br />Check your spelling and try agin!</p>
            </>}
        </ul>
      </main >
    ) : (
        <Redirect to="/login" />
      )
  }
}
