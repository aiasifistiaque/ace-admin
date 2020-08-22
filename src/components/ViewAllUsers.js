/** @format */
// this component is verified and tested

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Users = props => {
  const users = props.users;
  return (
    <div>
      {users.map((user, index) => (
        <div key={user._id}>
          <p>
            {index} name: {user.firstname} {user.lastname}
          </p>
          <p>email: {user.email}</p>
          <p>id: {user._id}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

const ViewAllUsers = () => {
  const host = useSelector(state => state.host);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(host + '/auth/allusers')
      .then(res => res.json())
      .then(res => {
        setUsers(res);
        setLoading(false);
      })
      .catch();
    console.log(users);
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <div style={{ flex: 1, paddingRight: 100, paddingLeft: 100 }}>
      <h3>users</h3>
      <p>Name:</p>
      {loading ? (
        <div>
          <h2>loading</h2>
        </div>
      ) : (
        <Users users={users} />
      )}
    </div>
  );
};

export default ViewAllUsers;
