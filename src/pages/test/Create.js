/** @format */

import React, { useState, useEffect } from 'react';
import { Select, Button, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  getCreateTest,
  postHeaders,
  getCourseList
} from '../../resources/strings';

const CreateTest = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(getCourseList)
      .then(res => res.json())
      .then(res => {
        setCourses(res);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const createNewTest = () => {
    fetch(getCreateTest, {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ course: course })
    })
      .then(res => res.json())
      .then(res => {
        setTest(res);
        setRedirect(true);
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return <CircularProgress />;
  } else if (redirect == true) {
    return <Redirect to={'/edittest/' + test._id} />;
  } else {
    return (
      <div style={styles.container}>
        <Select native value={course} onChange={e => setCourse(e.target.value)}>
          <option placeholder='select a course'></option>
          {courses.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        <br />
        <Button variant='contained' color='primary' onClick={createNewTest}>
          Create Test
        </Button>
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
  linkButton: {
    color: 'white',
    textDecorationLine: 'none'
  }
};

export default CreateTest;
