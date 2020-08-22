/** @format */

import React, { useState, useEffect } from 'react';
import { InputLabel, Select, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Questions from './Questions';
import Chapters from './Chapters';
import Test from './Test';

const Options = props => {
  const option = props.option;
  const [course, setCourse] = useState('all');
  const host = useSelector(state => state.host);
  const [courseOptions, setCourseOptions] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState('all');
  const [viewChapter, setViewChapter] = useState('all');
  const [viewCourse, setViewCourse] = useState('all');
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    fetch(host + '/api/course/allcourse')
      .then(res => res.json())
      .then(res => setCourseOptions(res));
  }, []);

  useEffect(() => {
    fetch(host + '/api/chapter/getchapters', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ course: course })
    })
      .then(res => res.json())
      .then(res => setChapters(res))
      .catch(err => {
        setChapters(['nothing found']);
        console.log(err);
      });
  }, [course]);

  if (option == 'question') {
    return (
      <div>
        <InputLabel htmlFor='questionSelect'>Select an option</InputLabel>
        <Select
          native
          value={course}
          onChange={e => setCourse(e.target.value)}
          inputProps={{
            name: 'questionSelect',
            id: 'questionSelect'
          }}>
          <option value='all'>all</option>
          {courseOptions.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        <Select
          native
          value={chapter}
          onChange={e => setChapter(e.target.value)}
          inputProps={{
            name: 'chapterSelect',
            id: 'chapterSelect'
          }}>
          <option value='all'>all</option>
          {chapters.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        <Button
          onClick={() => {
            setShowQuestions(true);
            setViewChapter(chapter);
            setViewCourse(course);
          }}>
          find questions
        </Button>
        {showQuestions ? (
          <Questions course={viewCourse} chapter={viewChapter} />
        ) : null}
      </div>
    );
  } else if (option == 'chapter') {
    return (
      <div>
        <InputLabel htmlFor='chapterSelect'>Select an option</InputLabel>
        <Select
          native
          value={course}
          onChange={e => setCourse(e.target.value)}
          inputProps={{
            name: 'chapterSelect',
            id: 'chapterSelect'
          }}>
          <option value=''></option>
          {courseOptions.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        <Button onClick={() => setShowChapters(true)}>find chapters</Button>
        {showChapters ? <Chapters course={course} /> : null}
      </div>
    );
  } else if (option == 'course') {
    return (
      <div>
        <Button onClick={() => setShowCourse(true)}>show courses</Button>
        {showCourse ? (
          <div>
            {courseOptions.map((opt, index) => (
              <div key={index}>
                <hr />
                <p>
                  {index + 1}: {opt}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  } else if (option == 'test') {
    return (
      <div>
        <Button onClick={() => setShowTest(true)}>show test</Button>
        {showTest ? (
          <div style={{ padding: 50 }}>
            <Test />
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div>
        <h2>nothing selected</h2>
      </div>
    );
  }
};

export default Options;
