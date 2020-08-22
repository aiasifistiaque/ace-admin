/** @format */

import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const AddQuestion = () => {
  const [course, setCourse] = useState('');
  const [chapter, setChapter] = useState('');
  const [question, setQuestion] = useState('');
  const [optionone, setOptionone] = useState('');
  const [optiontwo, setOptiontwo] = useState('');
  const [optionthree, setOptionthree] = useState('');
  const [optionfour, setOptionfour] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const host = useSelector(state => state.host);

  const formSubmitted = () => {
    if (
      question.trim().length <= 0 ||
      answer.trim().length <= 0 ||
      course.trim().length <= 0 ||
      optionone.trim().length <= 0 ||
      optiontwo.trim().length <= 0 ||
      optionthree.trim().length <= 0 ||
      optionfour.trim().length <= 0 ||
      answer.trim().length <= 0 ||
      chapter.trim().length <= 0
    ) {
      setErrorMessage('error: could not be saved');
    } else {
      const newQuestion = {
        question: question,
        optionone: optionone,
        optiontwo: optiontwo,
        optionthree: optionthree,
        optionfour: optionfour,
        answer: answer,
        course: course,
        chapter: chapter
      };
      fetch(host + '/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
      })
        .then(res => res.json())
        .then(res => {
          console.log('success', res);
          setErrorMessage('Success: Question saved');
        })
        .catch(error => {
          setErrorMessage('Error: could not be saved');
          console.log(error);
        });

      setQuestion('');
      setOptionone('');
      setOptiontwo('');
      setOptionthree('');
      setOptionfour('');
      setAnswer('');
    }
  };

  return (
    <div style={{ paddingBottom: 200 }}>
      <h3
        style={{
          backgroundColor: 'darkslateblue',
          paddingTop: 20,
          paddingBottom: 20,
          color: 'whitesmoke'
        }}>
        Add Question
      </h3>
      <hr style={{ backgroundColor: 'whitesome' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 100,
          paddingLeft: 100,
          paddingTop: 50
        }}>
        <TextField
          id='course'
          label='Course'
          variant='outlined'
          value={course}
          onChange={text => setCourse(text.target.value)}
        />
        <br />
        <TextField
          id='chapter'
          label='Chapter'
          variant='outlined'
          value={chapter}
          onChange={text => setChapter(text.target.value)}
        />
        <br />
        <TextField
          id='question'
          label='Question'
          variant='outlined'
          multiline={true}
          value={question}
          onChange={text => setQuestion(text.target.value)}
        />
        <br />
        <TextField
          id='optionone'
          label='Option a'
          variant='outlined'
          value={optionone}
          onChange={text => setOptionone(text.target.value)}
        />
        <br />
        <TextField
          id='optiontwo'
          label='Option b'
          variant='outlined'
          value={optiontwo}
          onChange={text => setOptiontwo(text.target.value)}
        />
        <br />
        <TextField
          id='optionthree'
          label='Option c'
          variant='outlined'
          value={optionthree}
          onChange={text => setOptionthree(text.target.value)}
        />
        <br />
        <TextField
          id='optionfour'
          label='Option d'
          variant='outlined'
          value={optionfour}
          onChange={text => setOptionfour(text.target.value)}
        />
        <br />
        <TextField
          id='answer'
          label='Answer'
          variant='outlined'
          value={answer}
          onChange={text => setAnswer(text.target.value)}
        />
        <br />
        <p>{errorMessage}</p>
        <Button
          style={{ backgroundColor: 'darkslateblue', color: 'whitesmoke' }}
          onClick={formSubmitted}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddQuestion;
