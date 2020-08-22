/** @format */

import React, { useState, useEffect } from 'react';
import { InputLabel, Select, Button } from '@material-ui/core';
import Question from './Question';
import Test from './Test';
import CreateTest from './CreateTest';
import { useCookies } from 'react-cookie';

import {
  getCourseList,
  getChapterList,
  getQuestionsFromChapter,
  postHeaders
} from '../../resources/strings';

const AddTest = () => {
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState('');
  const [questions, setQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['create', 'course']);
  const [course, setCourse] = useState(cookies.course);

  useEffect(() => {
    console.log(cookies);
    if (cookies.create != 'true') {
      console.log('lalacookie');
      setCookie('create', false, { path: '/addtest' });
    }
    fetch(getCourseList)
      .then(res => res.json())
      .then(res => {
        setCourses(res);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch(getChapterList, {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ course: course })
    })
      .then(res => res.json())
      .then(res => setChapters(res))
      .catch(err => {
        setChapters(['nothing found']);
        console.log(err);
      });
  }, [course]);

  const findQuestions = () => {
    fetch(getQuestionsFromChapter, {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ course: course, chapter: chapter })
    })
      .then(res => res.json())
      .then(res => setQuestions(res))
      .catch(err => console.log(err));
  };

  if (loading) {
    return <div>Loading</div>;
  } else if (cookies.create == 'false') {
    return (
      <CreateTest
        courses={courses}
        onTestCreate={(test, bol) => {
          setTest(test);
          setCourse(test.course);
          setCookie('create', true, { path: '/addtest' });
          setCookie('course', test.course, { path: '/addtest' });
        }}
      />
    );
  } else {
    return (
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <h3>Questions</h3>
          <p>course: {course}</p>

          <InputLabel htmlFor='questionSelect'>Select an option</InputLabel>

          <Select
            native
            value={chapter}
            onChange={e => setChapter(e.target.value)}>
            <option value='all'>all</option>
            {chapters.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </Select>

          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: 10 }}
            onClick={findQuestions}>
            find questions
          </Button>
          {questions.map((question, index) => (
            <Question
              key={question._id}
              question={question}
              index={index}
              onSelectQuestion={item =>
                setTestQuestions([...testQuestions, item])
              }
            />
          ))}
        </div>

        <div style={styles.rightContainer}>
          <h3>Test</h3>
          <Test questions={testQuestions} test={test} />
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,

    justifyContent: 'center'
  },
  leftContainer: { flex: 1, backgroundColor: 'snow', padding: 20 },
  rightContainer: { flex: 1, backgroundColor: 'whitesmoke', padding: 20 }
};

export default AddTest;
