/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      <h2>This is the about page</h2>
      <Link to='/'>back home</Link>
    </div>
  );
};

export default AboutPage;
