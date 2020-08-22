/** @format */

import React, { useEffect, useState } from 'react';
import Question from './Question';
import Test from './Test';
import {
  host,
  postHeaders,
  getChapterList,
  getQuestionsFromChapter
} from '../../resources/strings';
import { useParams } from 'react-router-dom';
import { Select, Button } from '@material-ui/core';

const EditTest = () => {
  const [test, setTest] = useState({});
  const testid = useParams();
  const [chapters, setChapters] = useState([]);
  const [course, setCourse] = useState('');
  const [chapter, setChapter] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testQuestions, setTestQuestions] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(host + '/api/test/getone', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ id: testid.id })
    })
      .then(res => res.json())
      .then(res => {
        setCourse(res.course);
        let existingId = [];
        res.questions.map((q, i) => existingId.push(q.questionid));
        setIds(existingId);
        setTest(res);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [testid]);

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

  useEffect(() => {
    fetch(host + '/api/test/getquestions/' + testid.id)
      .then(res => res.json())
      .then(res => {
        setTestQuestions(res.questions);
      })
      .catch(err => console.log(err));
  }, [test]);

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

  const add = question => {
    let existingId = [];
    test.questions.map((q, i) => existingId.push(q.questionid));
    console.log(test);
    existingId.includes(question._id) == true
      ? alert('question exists')
      : fetch(host + '/api/test/add', {
          method: 'post',
          headers: postHeaders,
          body: JSON.stringify({ testid: test._id, questionid: question._id })
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            loadTest(testid.id);
          })
          .catch(err => console.log(err));
  };

  const deleteQuestion = id => {
    fetch(host + '/api/test/delete', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({
        testid: test._id,
        questionid: id
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        loadTest(testid.id);
      })
      .catch(err => console.log(err));
  };

  const loadTest = id => {
    setLoading(true);
    fetch(host + '/api/test/getone', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ id: id })
    })
      .then(res => res.json())
      .then(res => {
        setTest(res);
        let existingId = [];
        res.questions.map((q, i) => existingId.push(q.questionid));
        setIds(existingId);
      })
      .catch(err => console.log(err));
    setLoading(false);
  };

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <div style={styles.box}>
            <p> id is: {test._id}</p>
            <p>course: {course}</p>
            <h3>Add Question</h3>

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
              style={{ marginLeft: 10 }}
              onClick={findQuestions}>
              find questions
            </Button>
          </div>

          {questions.map((question, index) => (
            <Question
              key={question._id}
              question={question}
              ids={ids}
              index={index}
              onSelectQuestion={item => add(item)}
            />
          ))}
        </div>
        <div style={styles.rightContainer}>
          <Test
            test={test}
            questions={testQuestions}
            onDeleteQuestion={questionid => {
              deleteQuestion(questionid);
            }}
          />
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
  box: { borderRadius: 6, padding: 15, margin: 10, backgroundColor: 'white' },
  leftContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
    paddingTop: 10,
    flexDirection: 'column',
    overflow: 'auto',
    maxHeight: '83vh',
    marginTop: 10,
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start'
  },
  rightContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'baseline',
    borderRadius: 6,
    overflow: 'hidden'
  }
};

export default EditTest;
