/** @format */

import React, { useState } from 'react';
import styles from './styles';
import { getTestStatus } from '../../methods/test';
import {
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  CircularProgress
} from '@material-ui/core';

const QuestionList = props => {
  const questions = props.questions;
  const loading = props.loading;
  const initialStatus = Array(questions.length).fill(0);
  const [status, setStatus] = useState(initialStatus);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <div>
        <h4 style={styles.testHeader}>
          total questions found: {questions.length}
        </h4>
      </div>
      <div style={styles.testContainer}>
        {questions.map((t, i) => (
          <div key={t._id} style={styles.box}>
            <p>
              {i + 1}: {t.course}
            </p>
            <p>id: {t._id}</p>
            <p>Q: {t.question}</p>
            <p>status: {getTestStatus(t.approved)}</p>
            <p>A: {t.optionone}</p>
            <p>B: {t.optiontwo}</p>
            <p>C: {t.optionthree}</p>
            <p>D: {t.optionfour}</p>
            <FormControl variant='outlined' style={{ width: 300, margin: 20 }}>
              <InputLabel id='approval'>Change Approval Status</InputLabel>
              <Select
                labelId='approval'
                id='approval'
                value={status[i]}
                onChange={e => {
                  let temp = [...status];
                  temp[i] = e.target.value;
                  setStatus(temp);
                }}>
                <MenuItem value={0}>
                  <em>Pending</em>
                </MenuItem>
                <MenuItem value={1}>Approve</MenuItem>
                <MenuItem value={2}>Disapprove</MenuItem>
                <MenuItem value={3}>Delete</MenuItem>
              </Select>
              <Button
                variant='contained'
                style={{ margin: 10 }}
                onClick={() => props.onChangeStatus(t._id, status[i])}>
                change
              </Button>
            </FormControl>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
