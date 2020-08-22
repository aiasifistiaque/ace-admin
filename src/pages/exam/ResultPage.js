/** @format */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const ResultPage = props => {
  const location = useLocation();
  const questions = location.state.questions;
  const answers = location.state.answers;
  const test = location.state.test;
  const host = useSelector(state => state.host);
  const totalQuestions = questions.length;
  const [cookies, setCookies] = useCookies(['user']);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [skipped, setSkipped] = useState(0);

  useEffect(() => {
    marks();
    saveTest();
  }, []);

  const marks = () => {
    let i;
    for (i = 0; i < totalQuestions; i++) {
      if (answers[i]) {
        if (answers[i] == questions[i].answer) {
          setCorrect(correct => correct + 1);
        } else {
          setWrong(wrong => wrong + 1);
        }
      } else {
        setSkipped(skipped => skipped + 1);
      }
    }
  };

  const saveTest = () => {
    fetch(host + '/api/test/history/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: cookies.user._id,
        testid: test._id,
        questions: questions,
        answer: answers,
        course: test.course
      })
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>Result Page</h3>
      <p>total: {totalQuestions}</p>
      <p>correct: {correct}</p>
      <p>wrong: {wrong}</p>
      <p>skipped: {skipped}</p>
    </div>
  );
};

export default ResultPage;
