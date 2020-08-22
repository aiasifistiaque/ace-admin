/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>This is the homepage</h2>
      <Link to='/about'>go to about page</Link>
      <br />
      <Link to='/view'>view admin resources</Link>
      <br />
      <Link to='/profile'>view profile</Link>
      <br />
      <Link to='/client'>view client</Link>
      <br />
      <Link to='/viewtests'>view all tests</Link>
      <br />
      <Link to='/viewquestion'>view all questions</Link>
      <br />
      <Link to='/addtest'>add a new test</Link>
    </div>
  );
};

export default HomePage;
