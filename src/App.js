/** @format */

import React from 'react';
import './App.css';
import General from './navigations/generalRouter';
import Login from './navigations/loginRouter';
import Appbar from './components/Appbar';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [cookies, setCookie] = useCookies(['isLogged', 'user']);
  React.useEffect(() => {
    if (cookies.isLogged == null) {
      setCookie('isLogged', false, { path: '/' });
    }
    console.log(cookies);
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        minHeight: '100vh'
      }}>
      <Router>
        <Appbar />
        <div style={{ paddingLeft: 40, paddingRight: 40 }}>
          {cookies.isLogged == 'true' ? <General /> : <Login />}
        </div>
      </Router>
    </div>
  );
}

export default App;
