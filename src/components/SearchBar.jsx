import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/searchbar.css';

export default function SearchBar({ list }) {

  const [search, setSearch] = useState({ name: '', id: '' });
  const [showing, setShowing] = useState(false);
  const [options, setOptions] = useState([]);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  let history = useHistory();

  const clickOption = obj => {
    setShowing(false);
    setSearch({ name: obj.name, id: obj._id });
    inputRef.current.focus();
  }

  const outsideClick = e => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setShowing(false);
    }
  }

  const submitSearch = () => {
    if (search.id) {
      history.push(`/classes/${search.id}`);
    } else if (search.name === '') {
      history.push(`/`)
    } else {
      history.push(`/search/${search.name}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await list();
      setOptions(res.classes);
    }
    fetchData();
  }, [])

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => {
      document.removeEventListener('click', outsideClick);
    }
  }, [])

  return (
    <div ref={wrapperRef} className="search-wrapper">
      <form onSubmit={submitSearch} >
        <input ref={inputRef} type="text" value={search.name} onClick={() => setShowing(!showing)} onChange={e => setSearch({ name: e.target.value })} />
      </form>
      <i className="fas fa-search"></i>
      {showing && <ul className='auto-options'>
        {options.filter(option => option.name.toLowerCase().match(search.name.toLowerCase())).slice(0, 10).map(option => <li onClick={() => clickOption(option)}>{option.name}</li>)}
      </ul>}
    </div>
  )
}
