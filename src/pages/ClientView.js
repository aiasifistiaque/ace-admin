/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputLabel, Select } from '@material-ui/core';
import Options from './clientview/Options';

const ClientView = () => {
  const [mainSelect, setMainSelect] = useState('');
  return (
    <div>
      <Link to='/'> go back</Link>
      <InputLabel htmlFor='mainSelect'>Select an option</InputLabel>
      <Select
        native
        value={mainSelect}
        onChange={e => setMainSelect(e.target.value)}
        inputProps={{
          name: 'mainSelect',
          id: 'mainSelect'
        }}>
        <option value='' />
        <option value={'question'}>Question</option>
        <option value={'chapter'}>Chapter</option>
        <option value={'course'}>Course</option>
        <option value={'test'}>Test</option>
      </Select>
      <p>mainSelect: {mainSelect}</p>
      <div>
        <Options option={mainSelect} />
      </div>
    </div>
  );
};

export default ClientView;
