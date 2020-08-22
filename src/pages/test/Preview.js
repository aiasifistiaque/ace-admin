/** @format */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { host, postHeaders } from '../../resources/strings';
import { CircularProgress } from '@material-ui/core';
import Questions from './Questions';
import { getTestStatus } from '../../methods/test';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';

const Preview = () => {
  const testid = useParams();
  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState();
  const [statusSelect, setStatusSelect] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(host + '/api/test/getquestions/' + testid.id)
      .then(res => res.json())
      .then(res => {
        setTest(res.test);
        setQuestions(res.questions);
        console.log(res);
        setLoading(false);
        setStatus(getTestStatus(res.test.statusCode));
      })
      .catch(err => console.log(err));
  }, []);

  const changeStatus = () => {
    if (statusSelect != '') {
      setMessage('');
      fetch(host + '/api/approvetest/changestatus', {
        method: 'post',
        headers: postHeaders,
        body: JSON.stringify({ testid: testid.id, status: statusSelect })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setStatus(getTestStatus(res.code));
          setMessage(res.status);
        })
        .catch(() => setMessage('could not be changed'));
    }
  };

  if (loading)
    return (
      <div style={styles.loading}>
        <CircularProgress />
      </div>
    );
  else {
    return (
      <div style={styles.main}>
        <div style={styles.container}>
          <div style={styles.containerLeft}>
            <h3>testid: {test._id}</h3>
            <p>course: {test.course}</p>
            <p>approval status: {status}</p>
            {message == '' ? null : <h5 style={styles.message}>{message}</h5>}
            <Button variant='contained' color='secondary'>
              <Link to={'/edittest/' + test._id} style={styles.link}>
                Edit this test
              </Link>
            </Button>
          </div>

          <div style={styles.containerRight}>
            <h4>Total Questions: {questions.length}</h4>
            <FormControl variant='outlined' style={{ width: 250 }}>
              <InputLabel id='demo-simple-select-filled-label'>
                Change Approval Status
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={statusSelect}
                onChange={e => setStatusSelect(e.target.value)}>
                <MenuItem value={status}>
                  <em>{status}</em>
                </MenuItem>
                <MenuItem value='approve'>Approve</MenuItem>
                <MenuItem value='disapprove'>Disapprove</MenuItem>
                <MenuItem value='delete'>Delete</MenuItem>
              </Select>
              <Button
                onClick={changeStatus}
                variant='contained'
                color='primary'
                style={{ marginTop: 10, width: 250 }}>
                Change
              </Button>
            </FormControl>
          </div>
        </div>

        <h2>Questions</h2>
        <Questions questions={questions} />
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 6,
    marginTop: 10
  },
  main: { padding: 40, paddingTop: 20 },
  containerLeft: { flex: 1 },
  containerRight: { flex: 1 },
  link: { color: 'white', textDecorationLine: 'none' },
  message: {
    backgroundColor: '#f7c4c4',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'crimson',
    marginRight: 40,
    borderRadius: 5
  },
  loading: {
    backgroundColor: 'white',
    display: 'flex',
    padding: 100,
    justifyContent: 'center',
    alignItems: 'ceter'
  }
};

export default Preview;
