/** @format */

import React, { useState } from 'react';
import { Select, Button } from '@material-ui/core';
import { getCreateTest, postHeaders } from '../../resources/strings';

const CreateTest = props => {
  const courses = props.courses;
  const [course, setCourse] = useState('');

  const createNewTest = () => {
    fetch(getCreateTest, {
      method: 'post',
      headers: postHeaders,
      body: JSON.stringify({ course: course })
    })
      .then(res => res.json())
      .then(res => props.onTestCreate(res, true))
      .catch(err => console.log(err));
  };

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
        Create test
      </Button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center'
  }
};

export default CreateTest;
