/** @format */

import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { host, postHeaders } from '../../resources/strings';
import { useCookies } from 'react-cookie';

const Test = props => {
  const [cookies, setCookie] = useCookies(['questions', 'test', 'create']);
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState({});

  React.useEffect(() => {
    //setCookie('create', false, { path: '/addtest' });
    if (props.questions != null) {
      setCookie('questions', props.questions);
      setQuestions(props.questions);
    } else {
      setQuestions(cookies.questions);
    }
    if (props.test != null) {
      setCookie('test', props.test);
      setTest(props.test);
    } else {
      setTest(cookies.test);
    }
    fetch(host + '/api/test/getone', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ id: test._id })
    })
      .then(res2 => res2.json())
      .then(res2 => setTest(res2))
      .catch(err => console.log(err));
  }, []);

  const addQuestion = id => {
    fetch(host + '/api/test/add', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ testid: test._id, questionid: id })
    })
      .then(res => res.json())
      .then(res => {
        fetch(host + '/api/test/getone', {
          method: 'post',
          headers: postHeaders,
          body: JSON.stringify({ id: test._id })
        })
          .then(res2 => res2.json())
          .then(res2 => setTest(res2))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    console.log(test);
  };

  return (
    <div style={styles.container}>
      <div>
        <p>test id: {test._id}</p>
        <p>questions: {test.questions.length || 0}</p>
      </div>

      {questions.map((q, index) => (
        <div key={q._id} style={styles.box}>
          <h3>
            {index + 1}: {q.question}
          </h3>
          <p>A: {q.optionone}</p>
          <p>B: {q.optiontwo}</p>
          <p>C: {q.optionthree}</p>
          <p>D: {q.optionfour}</p>
          <Button
            onClick={() => addQuestion(q._id)}
            variant='contained'
            color='primary'
            style={{ marginLeft: 10, marginRight: 10 }}>
            add
          </Button>
        </div>
      ))}
      <Button
        variant='contained'
        color='secondary'
        onClick={() => setCookie('create', false, { path: '/addtest' })}>
        Save Test & Exit
      </Button>
    </div>
  );
};

const styles = {
  box: {
    padding: 10,
    borderColor: 'lavender',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 7,
    margin: 20
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
};

export default Test;
