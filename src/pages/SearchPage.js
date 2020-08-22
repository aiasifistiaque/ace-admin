/** @format */

import React, { useState } from 'react';
import transcribe from '../js/phonetic';
import { useSelector } from 'react-redux';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [transValue, setTransValue] = useState('zero');
  const host = useSelector(state => state.host);
  const [type, setType] = useState('');
  const [value, setValue] = useState([]);

  React.useEffect(() => {
    if (searchValue.length < 2) {
      setValue([]);
      setType('');
    }
    fetch(host + '/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchBangla: transValue,
        searchEnglish: searchValue,
        catagory: 'chapter'
      })
    })
      .then(res => res.json())
      .then(res => {
        setType(res.type);
        setValue(res.value);
      })
      .catch(err => console.log(err));
    return () => {};
  }, [searchValue, host, transValue]);

  const searchButtonPressed = () => {
    // const value = transcribe(searchValue);
    // setTransValue(value);
  };

  return (
    <div>
      <h3>this is the seach page</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '100px',
          marginRight: '100px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <input
          type='text'
          placeholder='search'
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
            setTransValue(transcribe(e.target.value));
          }}
        />
        <input type='submit' onClick={searchButtonPressed} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <p>value of search box: {searchValue}</p>
        <p>transcribed value is: {transValue}</p>
      </div>
      <hr />
      <div>
        {value == null ? (
          <div>searching</div>
        ) : (
          <div>
            <SearchValueComponent type={type} value={value} />
          </div>
        )}
      </div>
    </div>
  );
};

const SearchValueComponent = props => {
  const res = props.value;
  return (
    <div>
      <p>{props.type}</p>
      {res.map((val, index) => (
        <div key={index}>
          <hr />
          <p>{val}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
