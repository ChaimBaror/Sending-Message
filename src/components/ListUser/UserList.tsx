import React from 'react';

const UserList = ({ users, setSelectedUser }) => {
  const handleUserClick = (user) => {
    setSelectedUser(user);
  }
  return (
    <div className="flex flex-col space-y-4">
      {users.map((user, index) => (
        <div key={index} className="flex items-center space-x-4" onClick={() => handleUserClick(user)}>
          <div className="font-bold">{user.username}</div>
          <div>{user.phone}</div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
