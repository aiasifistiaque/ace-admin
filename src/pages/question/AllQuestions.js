/** @format */

import React, { useState, useEffect } from 'react';
import { host, postHeaders } from '../../resources/strings';
import styles from './styles';
import QuestionList from './QuestionList';
import {
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel
} from '@material-ui/core';

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState();
  const [questionViewLoading, setQuestionViewLoading] = useState();

  useEffect(() => {
    fetch(host + '/api/course/allcourse')
      .then(res => res.json())
      .then(res => setCourses(res))
      .catch(err => console.log(err));
  }, []);

  const changeStatus = (id, status) => {
    console.log(id, status);
    fetch(host + '/api/approvetest/changequestionstatus', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ questionid: id, status: status })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        getQuestions();
      })
      .catch(err => console.log(err));
  };

  const getQuestions = () => {
    setQuestionViewLoading(true);
    setLoading(true);
    fetch(host + '/api/approvetest/getquestions', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ course: course, status: status })
    })
      .then(res => res.json())
      .then(res => {
        setQuestions(res);
        setLoading(false);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.select}>
        <FormControl variant='outlined' style={{ width: 300, margin: 20 }}>
          <InputLabel id='course'>Course</InputLabel>
          <Select
            labelId='course'
            id='course'
            value={course}
            onChange={e => setCourse(e.target.value)}>
            <MenuItem value='all'>all</MenuItem>
            {courses.map((opt, index) => (
              <MenuItem key={index} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant='outlined' style={{ width: 300, margin: 20 }}>
          <InputLabel id='status'>Approval Status</InputLabel>
          <Select
            labelId='status'
            id='status'
            value={status}
            onChange={e => setStatus(e.target.value)}>
            <MenuItem value='all'>
              <em>all</em>
            </MenuItem>
            <MenuItem value='0'>Pending</MenuItem>
            <MenuItem value='1'>Approved</MenuItem>
            <MenuItem value='2'>Disapproved</MenuItem>
            <MenuItem value='3'>Deleted</MenuItem>
          </Select>
          <Button
            variant='contained'
            style={{ margin: 10 }}
            onClick={getQuestions}>
            search
          </Button>
        </FormControl>
        <div>
          {questionViewLoading ? (
            <QuestionList
              questions={questions}
              loading={loading}
              onChangeStatus={(id, status) => changeStatus(id, status)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
