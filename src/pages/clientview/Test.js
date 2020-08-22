/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Test = () => {
  const [tests, setTests] = useState([]);
  const host = useSelector(state => state.host);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies(['user']);

  useEffect(() => {
    fetch(host + '/api/test/gettest/course', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course: 'all', id: cookies.user._id })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTests(res);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <p>selected: </p>
        {tests.map((test, index) => (
          <div key={test.test._id} style={styles.box}>
            {test.taken == true ? (
              <p style={{ color: 'crimson' }}>taken</p>
            ) : (
              <p style={{ color: 'teal' }}>not taken</p>
            )}
            <p>id: {test.test._id}</p>
            <p>course: {test.test.course}</p>
            <p>number of questions: {test.test.questions.length}</p>

            <Link to={'/test/' + test.test._id} style={styles.link}>
              take test
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

const styles = {
  link: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'crimson',
    color: 'white',
    textDecorationLine: 'none',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  box: {
    padding: 40,
    borderColor: 'lavender',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 20
  }
};

export default Test;
