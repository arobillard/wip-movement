import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/searchbar.css';

export default function SearchBar({ list }) {

  const [search, setSearch] = useState('');
  const [showing, setShowing] = useState(false);
  const [options, setOptions] = useState([]);

  const wrapperRef = useRef(null);

  let history = useHistory();

  const clickOption = id => {
    setShowing(false);
    setSearch('');
    history.push(`/classes/${id}`);
  }

  const outsideClick = e => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setShowing(false);
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
      <input type="text" value={search} onClick={() => setShowing(!showing)} onChange={e => setSearch(e.target.value)} />
      <i class="fas fa-search"></i>
      {showing && <ul className='auto-options'>
        {options.filter(option => option.name.toLowerCase().match(search.toLowerCase())).slice(0, 10).map(option => <li onClick={() => clickOption(option.id)}>{option.name}</li>)}
      </ul>}
    </div>
  )
}
