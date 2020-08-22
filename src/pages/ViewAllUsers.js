/** @format */

import React, { useState } from 'react';
import AllUsers from '../components/ViewAllUsers';
import Questions from '../components/ViewAllQuestions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CondView = props => {
  const option = props.option;
  if (option == 'users') {
    return <AllUsers />;
  } else if (option == 'questions') {
    return <Questions />;
  } else if (option == 'initial') {
    return <div>null</div>;
  }
};

function ViewAllUsers() {
  const [option, setOption] = useState('initial');
  return (
    <div>
      <div style={{ display: 'flex', margin: 50, justifyContent: 'center' }}>
        <Button
          variant='contained'
          color='primary'
          style={{ margin: 20 }}
          onClick={() => setOption('users')}>
          show users
        </Button>
        <Button
          variant='contained'
          color='primary'
          style={{ margin: 20 }}
          onClick={() => setOption('questions')}>
          show questions
        </Button>
        <Link
          to='/add/question'
          style={{
            margin: 20,
            padding: 10,
            color: 'whitesmoke',
            backgroundColor: '#3f51b5',
            borderRadius: 5,
            textDecorationLine: 'none',
            alignItems: 'center'
          }}>
          Add Question
        </Link>
        <Link
          to='/search'
          style={{
            margin: 20,
            padding: 10,
            color: 'whitesmoke',
            backgroundColor: '#3f51b5',
            borderRadius: 5,
            textDecorationLine: 'none',
            alignItems: 'center'
          }}>
          go to search
        </Link>
      </div>
      <CondView option={option} />
    </div>
  );
}

export default ViewAllUsers;
