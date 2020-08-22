/** @format */

import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Test = props => {
  const test = props.test;
  const [loading, setLoading] = useState(false);
  const questions = props.questions;

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div style={styles.container}>
        <div>
          <p>test id: {test._id}</p>
          <p>course: {test.course}</p>
          <p>Number of Questions: {questions.length}</p>
        </div>
        {questions.length > 0 ? (
          <div>
            {questions.map((q, index) => (
              <div key={index} style={styles.box}>
                <h3>
                  {index + 1}: {q.question}
                </h3>
                <p>A: {q.optionone}</p>
                <p>B: {q.optiontwo}</p>
                <p>C: {q.optionthree}</p>
                <p>D: {q.optionfour}</p>
                <Button
                  variant='contained'
                  onClick={() => props.onDeleteQuestion(q._id)}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    backGroundColor: 'red'
                  }}>
                  Delete this questions
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div>no questions</div>
        )}
        <Button variant='contained' color='secondary'>
          <Link to={'/previewtest/' + test._id} style={styles.link}>
            Preview
          </Link>
        </Button>
      </div>
    );
  }
};

const styles = {
  box: {
    padding: 10,
    borderColor: 'lavender',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 7,
    margin: 20
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  link: { color: 'white', textDecorationLine: 'none' }
};

export default Test;
