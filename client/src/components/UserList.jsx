import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState({"id":1000,"name":"test1000"});

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/1')
      .then(response => response.json())
      .then(data => setSingleUser(data))
      .catch(error => console.error('Error fetching user:', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h1>User</h1>
      <ul>
      <li key={setSingleUser.id}>{singleUser.name}</li>
      </ul>
    </div>
  );
};

export default UserList;