/** @format */

import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const AboutPage = () => {
  const host = useSelector(state => state.host);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['isLogged', 'user']);

  const login = () => {
    fetch(host + '/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email: username, password: password })
    })
      .then(res => res.json())
      .then(res => {
        setCookie('isLogged', true, { path: '/' });
        setCookie('user', res.user, { path: '/' });
      })
      .catch(err => console.log(err));
  };

  const submitButtonPressed = () => {
    login();
    setUsername('');
    setPassword('');
    console.log(cookies);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
      }}>
      <br />
      <form
        autoComplete='off'
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderWidth: 1,
          borderColor: 'lavender',
          backgroundColor: 'white',
          borderStyle: 'solid',
          padding: 30,
          paddingTop: 50,
          paddingBottom: 80,
          margin: 20,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: 'center',
          width: 300,
          borderRadius: 7
        }}>
        <h3>Login to continue</h3>
        <TextField
          id='username'
          label='username'
          placeholder='username/email'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required></TextField>
        <br />
        <TextField
          id='password'
          label='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required></TextField>
        <br />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{
            marginTop: 20,
            color: 'white',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'cennter'
          }}
          onClick={submitButtonPressed}>
          login
        </Button>
      </form>
    </div>
  );
};

export default AboutPage;
