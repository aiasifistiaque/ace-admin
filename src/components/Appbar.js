/** @format */

import React from 'react';
import { AppBar, Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Appbar = () => {
  const [cookies, setCookie] = useCookies(['name', 'isLogged']);
  const logout = () => {
    setCookie('isLogged', false, { path: '/' });
    setCookie('user', null, { path: '/' });
    console.log(cookies);
  };

  return (
    <AppBar
      position='static'
      style={{
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Link
        to='/'
        style={{
          textDecorationLine: 'none',
          color: 'white',
          fontWeight: 'bold',
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20
        }}>
        ACE by testmate
      </Link>
      <div
        style={{
          justifyContent: 'flex-end',
          display: 'flex'
        }}>
        {cookies.isLogged == 'true' ? (
          <Button onClick={logout} style={{ color: 'whitesmoke' }}>
            logout
          </Button>
        ) : null}
      </div>
    </AppBar>
  );
};

export default Appbar;
