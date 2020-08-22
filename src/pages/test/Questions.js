/** @format */

import React from 'react';
import { Button } from '@material-ui/core';

const Question = props => {
  const questions = props.questions;
  const optionStyle = (option, answer) => {
    let clr = 'black';
    if (option == answer) {
      console.log(option, answer);
      return {
        padding: 20,
        paddingLeft: 25,
        backgroundColor: '#A8FF9D',
        borderRadius: 5,
        color: '#339027',
        width: '30%',
        display: 'flex'
      };
    } else {
      return { color: 'black', paddingLeft: 25 };
    }
  };

  return (
    <div style={styles.container}>
      {questions.map((q, index) => (
        <div style={styles.border} key={q._id}>
          <h5
            style={{
              paddingLeft: 20,
              paddingRight: 20
            }}>
            chapter: {q.chapter}
          </h5>
          <div
            style={{ padding: 20, paddingTop: 10, backgroundColor: 'white' }}>
            <h3 style={{ paddingBottom: 20 }}>
              {index + 1}: {q.question}
            </h3>

            <p style={optionStyle(q.optionone, q.answer)}>A: {q.optionone}</p>
            <p style={optionStyle(q.optiontwo, q.answer)}>B: {q.optiontwo}</p>
            <p style={optionStyle(q.optionthree, q.answer)}>
              C: {q.optionthree}
            </p>
            <p style={optionStyle(q.optionfour, q.answer)}>D: {q.optionfour}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  border: {
    borderWidth: 1,
    flex: 1,
    width: '100%',
    borderColor: 'whitesmoke',
    borderRadius: 6,
    borderStyle: 'solid',
    marginBottom: 20,
    backgroundColor: 'whitesmoke'
  }
};

export default Question;
