/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Chapters = props => {
  const course = props.course;
  const host = useSelector(state => state.host);
  const [chp, setChapters] = useState([]);
  useEffect(() => {
    fetch(host + '/api/chapter/getchapters', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ course: course })
    })
      .then(res => res.json())
      .then(res => setChapters(res))
      .catch(err => {
        setChapters(['nothing found']);
        console.log(err);
      });
  }, [course]);
  return (
    <div>
      {chp.map((chapter, index) => (
        <div key={index}>
          <hr />
          <p>{chapter}</p>
        </div>
      ))}
    </div>
  );
};

export default Chapters;
