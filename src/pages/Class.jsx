import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import classService from '../utils/classService';
import '../styles/class.css';

export default function Class() {

  const { id } = useParams();

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
  }, [id])

  return (
    <main>
      <h1>{thisClass.name}</h1>
      <video src={thisClass.video} controls />
    </main>
  )
}
