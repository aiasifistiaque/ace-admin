/** @format */

import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Client from '../pages/ClientPage';
import Appbar from '../components/Appbar';

const generalRouter = () => {
  return (
    <Switch>
      <Route path='/'>
        <Client />
      </Route>
    </Switch>
  );
};

export default generalRouter;
