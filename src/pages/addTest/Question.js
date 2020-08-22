/** @format */

import React from 'react';
import { Button } from '@material-ui/core';

const Question = props => {
  const q = props.question;
  const index = props.index;
  return (
    <div style={styles.border}>
      <p>id: {q._id}</p>
      <p>course: {q.course}</p>
      <p>chapter: {q.chapter}</p>
      <h3>
        {index + 1}: {q.question}
      </h3>
      <p>A: {q.optionone}</p>
      <p>B: {q.optiontwo}</p>
      <p>C: {q.optionthree}</p>
      <p>D: {q.optionfour}</p>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => props.onSelectQuestion(q)}>
        add to test
      </Button>
    </div>
  );
};

const styles = {
  border: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lavender',
    borderRadius: 8,
    borderStyle: 'solid',
    margin: 10
  }
};

export default Question;
