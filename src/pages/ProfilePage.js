/** @format */

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [questions, setQuestions] = useState([]);
  const [tests, setTests] = useState([]);
  const [showSavedQuestions, setShowSavedQuestions] = useState(false);
  const [showExamHistory, setShowExamHistory] = useState(false);
  const host = useSelector(state => state.host);

  const savedQuestions = () => {
    fetch(host + '/api/save/getquestion', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: user._id })
    })
      .then(res => res.json())
      .then(res => {
        setQuestions(res);
        setShowExamHistory(false);
        setShowSavedQuestions(true);
      })
      .catch(err => console.log(err));
  };

  const testHistory = () => {
    fetch(host + '/api/test/userhistory/' + user._id)
      .then(res => res.json())
      .then(res => {
        setTests(res);
        setShowSavedQuestions(false);
        setShowExamHistory(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Profile</h2>
      <hr />
      <p>
        name: {user.firstname} {user.lastname}
      </p>
      <p>email: {user.email}</p>
      <p>user id: {user._id}</p>
      <p>user type: {user.regStatus}</p>
      <Button variant='outlined' color='primary' onClick={savedQuestions}>
        view saved questions
      </Button>
      <Button variant='outlined' color='primary' onClick={testHistory}>
        view test history
      </Button>
      {showSavedQuestions ? <SavedQuestions questions={questions} /> : null}
      {showExamHistory ? <ExamHistory tests={tests} /> : null}
    </div>
  );
};

const SavedQuestions = props => {
  const questions = props.questions;
  return (
    <div>
      {questions.map((question, index) => (
        <div key={question._id}>
          <hr />
          <p>
            {index + 1}: {question.question}
          </p>
        </div>
      ))}
    </div>
  );
};

const ExamHistory = props => {
  const [showTest, setShowTest] = useState([]);
  const tests = props.tests;

  React.useEffect(() => {
    buildArray();
    console.log(props);
  }, []);

  const buildArray = () => {
    let length = tests.length;
    let i;
    let temp = [...showTest];
    for (i = 0; i < length; i++) {
      temp[i] = 0;
    }
    setShowTest(temp);
  };

  return (
    <div>
      {tests.map((test, index) => (
        <div key={test._id} style={styles.testBox}>
          <p>exam id: {test._id}</p>
          <p>test id: {test.testid}</p>
          <p>total marks: {test.totalMarks}</p>
          <p>obtained: {test.obtainedMarks}</p>
          <input
            type='button'
            style={styles.buttonCrimson}
            value='view'
            onClick={() => {
              let temp = [...showTest];
              temp[index] == 0 ? (temp[index] = 1) : (temp[index] = 0);
              setShowTest(temp);
            }}
          />
          {showTest[index] == 1 ? <ViewOneTest test={test} /> : null}
        </div>
      ))}
    </div>
  );
};

const ViewOneTest = props => {
  const [questions, setQuestions] = useState([]);
  const [resource, setResource] = useState([]);
  const test = props.test;

  React.useEffect(() => {
    testHistory();
    console.log(resource);
  }, []);

  const testHistory = () => {
    fetch('http://localhost:5000/api/test/findahistory/' + test._id)
      .then(res => res.json())
      .then(res => setQuestions(res.questions))
      .catch(err => console.log(err));
  };

  return (
    <div style={styles.testBox}>
      {questions.map((question, index) => (
        <div key={index}>
          {test.questions[index].isCorrect == 1 ? (
            <p style={{ color: 'teal' }}>**correct</p>
          ) : (
            <p style={{ color: 'crimson' }}>***wrong</p>
          )}
          <p>
            {index + 1}: {question.question}
          </p>
          <p>a: {question.optionone}</p>
          <p>b: {question.optiontwo}</p>
          <p>c: {question.optionthree}</p>
          <p>d: {question.optionfour}</p>
          <p>correct: {question.answer}</p>
          <p>answered: {test.questions[index].answer}</p>
          <hr style={{ color: 'lavender' }} />
        </div>
      ))}
    </div>
  );
};

const styles = {
  testBox: {
    padding: 40,
    margin: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lavender',
    borderStyle: 'solid'
  },
  buttonCrimson: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'crimson',
    color: 'whitesmoke',
    borderRadius: 3
  }
};

export default ProfilePage;
