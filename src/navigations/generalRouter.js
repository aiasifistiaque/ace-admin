/** @format */

import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ViewAllUsers from '../pages/ViewAllUsers';
import AddQuestion from '../pages/AddQuestion';
import Search from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import Clientview from '../pages/ClientView';
import TestPage from '../pages/exam/TestPage';
import ResultPage from '../pages/exam/ResultPage';
import CreateTest from '../pages/test/Create';
import EditTest from '../pages/test/Edit';
import PreviewTest from '../pages/test/Preview';
import ViewAllTests from '../pages/test/ViewAll';
import ViewAllQuestions from '../pages/question/AllQuestions';

const generalRouter = () => {
  return (
    <Switch>
      <Route path='/about'>
        <AboutPage />
      </Route>
      <Route path='/test/:id'>
        <TestPage />
      </Route>
      <Route path='/previewtest/:id'>
        <PreviewTest />
      </Route>
      <Route path='/testresult'>
        <ResultPage />
      </Route>
      <Route path='/addtest'>
        <CreateTest />
      </Route>
      <Route path='/viewtests'>
        <ViewAllTests />
      </Route>
      <Route path='/viewquestion'>
        <ViewAllQuestions />
      </Route>
      <Route path='/edittest/:id'>
        <EditTest />
      </Route>
      <Route path='/profile'>
        <ProfilePage />
      </Route>
      <Route path='/client'>
        <Clientview />
      </Route>
      <Route path='/add/question'>
        <AddQuestion />
      </Route>
      <Route path='/search'>
        <Search />
      </Route>
      <Route path='/view'>
        <ViewAllUsers />
      </Route>
      <Route path='/'>
        <HomePage />
      </Route>
    </Switch>
  );
};

export default generalRouter;
