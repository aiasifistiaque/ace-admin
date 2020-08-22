/** @format */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ViewAllQuestions = () => {
  const host = useSelector(state => state.host);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState();

  React.useEffect(() => {
    setLoading(true);
    fetch(host + '/api/question')
      .then(res => res.json())
      .then(res => {
        setQuestions(res);
        // console.log(res);
        setLoading(false);
      });
    //.finally(() => setLoading(false));
    return () => {};
  }, []);

  return (
    <div
      style={{ dispaly: 'flex', flex: 1, paddingRight: 100, paddingLeft: 100 }}>
      <h3>Questions</h3>

      {loading ? (
        <div>
          <h2>loading</h2>
        </div>
      ) : (
        <Questions questions={questions} />
      )}
    </div>
  );
};

const Questions = props => {
  const questions = props.questions;
  return (
    <div>
      {questions.map((question, index) => (
        <div
          key={question._id}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            marginRight: '10%',
            marginLeft: '10%'
          }}>
          <p>question no. {index + 1}</p>
          <p>{question.course}</p>
          <p>id: {question._id}</p>
          <br />
          <h3
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginLeft: 100
            }}>
            {question.question}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <p>a: {question.optionone}</p>
            <p>b: {question.optiontwo}</p>
            <p>c: {question.optionthree}</p>
            <p>d: {question.optionfour}</p>
          </div>
          <p>{question.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewAllQuestions;
