/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';

const Questions = props => {
  const course = props.course;
  const [questions, setQuestions] = useState([]);
  const host = useSelector(state => state.host);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['user']);
  const chapter = props.chapter;

  useEffect(() => {
    setLoading(true);
    fetch(host + '/api/course/getpracticequestions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ course: course, chapter: chapter })
    })
      .then(res => res.json())
      .then(res => {
        setQuestions(res);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [course, chapter]);

  const save = question => {
    fetch(host + '/api/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id: cookies.user._id,
        questionid: question._id
      })
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 50
        }}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        {questions.map((question, index) => (
          <div key={question._id}>
            <p>
              {index + 1}: {question.course}-{question.question}
            </p>
            <Button
              variant='contained'
              color='primary'
              onClick={() => save(question)}>
              save
            </Button>
          </div>
        ))}
      </div>
    );
  }
};

export default Questions;
