import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import classService from '../utils/classService';
import '../styles/class.css';

export default function Class() {

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [thisClass, setThisClass] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await classService.getOne(id);
        setThisClass(res.class);
      } catch (err) {
        alert('woops!');
      }
    }
    fetchData();
    setLoading(false);
  }, [id])

  return loading ? (
    <main className="main-class">
      LOADING...
    </main>
  ) : (
      <main className="main-class">
        <h1>{thisClass.name}</h1>
        <video src={thisClass.video} controls />
      </main>
    )
}
