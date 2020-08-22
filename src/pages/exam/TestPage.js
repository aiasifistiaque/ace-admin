/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import { Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const TestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const host = useSelector(state => state.host);
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(host + '/api/test/getquestions/' + id)
      .then(res => res.json())
      .then(res => {
        setTest(res.test);
        setQuestions(res.questions);
        console.log(res);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div style={styles.loader}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <p>test id: {test._id}</p>
        <p>course: {test.course}</p>
        {questions.map((question, index) => (
          <div key={question._id} style={styles.questionBox}>
            <p style={{ fontSize: 25, fontWeight: 'bold' }}>
              {index + 1}: {question.question}
            </p>

            {/* options for the question */}
            <div>
              <FormLabel>Select the correct answer</FormLabel>
              <RadioGroup
                name='optionRadio'
                value={answers[index]}
                onChange={e => {
                  let temp = answers;
                  temp[index] = e.target.value;
                  setAnswers(temp);
                  console.log(answers);
                  console.log(answers[index]);
                }}>
                <FormControlLabel
                  value={question.optionone}
                  label={question.optionone}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={question.optiontwo}
                  label={question.optiontwo}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={question.optionthree}
                  label={question.optionthree}
                  control={<Radio />}
                />
                <FormControlLabel
                  value={question.optionfour}
                  label={question.optionfour}
                  control={<Radio />}
                />
              </RadioGroup>
            </div>
          </div>
        ))}
        <Link
          to={{
            pathname: '/testresult',
            state: { test: test, questions: questions, answers: answers }
          }}>
          Submit Answers
        </Link>
      </div>
    );
  }
};

const styles = {
  questionBox: {
    padding: 20,
    margin: 20,
    borderRadius: 5,
    borderColor: 'lavender',
    borderStyle: 'solid',
    borderWidth: 1
  },
  loader: {
    display: 'flex',
    margin: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default TestPage;
