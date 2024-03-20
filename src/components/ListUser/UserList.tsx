import React from 'react';

interface User {
  username: string;
  phone: string;
}

interface UserListProps {
  users: User[];
  setSelectedUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, setSelectedUser }) => {
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

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
