/** @format */

import React, { useState, useEffect } from 'react';
import { host, postHeaders } from '../../resources/strings';
import { getTestStatus } from '../../methods/test';
import { Link } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  CircularProgress
} from '@material-ui/core';

const ViewAll = () => {
  const [status, setStatus] = useState(0);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [tests, setTests] = useState([]);
  const [loadTest, setLoadTest] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetch(host + '/api/course/allcourse')
      .then(res => res.json())
      .then(res => setCourses(res));
  }, []);

  const getTests = () => {
    setLoadTest(true);
    setLoading(true);
    fetch(host + '/api/approvetest/gettest', {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ course: course, status: status })
    })
      .then(res => res.json())
      .then(res => {
        setTests(res);
        setLoading(false);
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
            <MenuItem value='0'>
              <em>Pending</em>
            </MenuItem>
            <MenuItem value='1'>Approved</MenuItem>
            <MenuItem value='2'>Disapproved</MenuItem>
            <MenuItem value='3'>Deleted</MenuItem>
          </Select>
          <Button variant='contained' style={{ margin: 10 }} onClick={getTests}>
            search
          </Button>
        </FormControl>
      </div>
      <div>
        {loadTest ? <TestList tests={tests} loading={loading} /> : null}
      </div>
    </div>
  );
};

const TestList = props => {
  const tests = props.tests;
  const loading = props.loading;
  if (loading) return <CircularProgress />;

  return (
    <div>
      <div>
        <h4 style={styles.testHeader}>total results found: {tests.length}</h4>
      </div>
      <div style={styles.testContainer}>
        {tests.map((t, i) => (
          <div key={t._id} style={styles.box}>
            <p>
              {i + 1}: {t.course}
            </p>
            <p>id: {t._id}</p>
            <p>Number of Questions {t.questions.length}</p>
            <p>status: {getTestStatus(t._statusCode)}</p>
            <Button
              variant='contained'
              color='secondary'
              style={{ margin: 10 }}>
              <Link style={styles.link} to={'/previewtest/' + t._id}>
                Preview & Change status
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: 10,
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  testHeader: {
    margin: 10,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 3,
    borderBottom: '5px solid crimson'
  },
  select: {
    backgroundColor: 'white',
    padding: 25,
    paddingTop: 35,
    paddingBottom: 35,
    margin: 10,
    marginTop: 30,
    borderRadius: 8
  },
  box: {
    padding: 25,
    paddingLeft: 35,
    paddingRight: 35,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    flex: 1
  },
  link: {
    color: 'white',
    textDecorationLine: 'none'
  },
  testContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    flexFlow: 'wrap'
  }
};

export default ViewAll;
