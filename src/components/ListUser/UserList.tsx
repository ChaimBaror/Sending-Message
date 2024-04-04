import React, { useState, useEffect } from 'react';

interface User {
  name: {
    first: string;
    last: string;
  };
  phone: string;
  picture?: {
    thumbnail: string;
    large: string;
  };
}
interface UserListProps {
  setSelectedUser: (user: { username: string; phone: string }) => void;
}
const UserList: React.FC<UserListProps> = ({ setSelectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser({ username: `${user.name.first} ${user.name.last}`, phone: user.phone });
  };

  const getData = async () => {

    const results = [
      { name: { first: 'חיים', last: ' בר-אור' }, phone: '+972 0527158077' },
      { name: { first: 'איתיאל', last: 'ראובן' }, phone: '+972 52-763-8404' },
      { name: { first: 'יואל', last: 'פריד' }, phone: '+972 50-312-1062' },
      { name: { first: 'מנחם', last: 'פיקסלר' }, phone: '+972 546684821' },
      { name: { first: 'שמעון', last: ' דורמנו' }, phone: '+972 585993447' },
    ];

    setUsers(results);
  };

  const getRandomAvtar: () => string = () => {
    return 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg';
  };

  const filterData = (searchTerm = '') => {
    return users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = filterData(searchTerm);

  const handleSelectChange = (e) => {
    const user = filteredUsers.find(user => user.phone === e.target.value);
    if (user)
    setSelectedUser({ username: `${user.name.first} ${user.name.last}`, phone: user.phone });

  }

  return (
    <div className='container w-80 overflow-hidden rounded-lg bg-white shadow-md '>
      <div className='hidden p-4 lg:block'>
        <header className='header relative flex bg-white p-8 shadow-md'>
          <input
            type='text'
            id='filter'
            placeholder='Search by name and/or location'
            value={searchTerm}
            onChange={handleInputChange}
            className='w-full rounded-full border-0 bg-gray-200 px-6 py-4 focus:outline-none'
          />
          <i className='fa-solid fa-magnifying-glass'></i>
        </header>
        <ul id='result' className='user-list m-0 h-96 list-none overflow-y-auto bg-white p-0'>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <li
                key={index}
                onClick={() => handleUserClick(user)}
                className='flex items-center border-b border-gray-300 py-5 px-4'
              >
                <img
                  src={'https://randomuser.me/api/portraits/men/' + index + '.jpg'}
                  alt={user.name.first}
                  className='h-12 w-12 rounded-full object-cover'
                />
                <div className='user-info ml-4'>
                  <h4 className='text-base font-semibold'>
                    {user.name.first} {user.name.last}
                  </h4>
                  <p className='text-sm'>{user.phone}</p>
                </div>
              </li>
            ))
          ) : (
            <li className='py-5 px-4'>
              <h3>Loading...</h3>
            </li>
          )}
        </ul>
      </div>
      <div className="relative mb-2 block flex items-center p-4 lg:hidden">
      <select 
        required
        className="w-64 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-black/70 outline-blue-600/50 transition-all invalid:text-black/30 hover:border-blue-600/30"
        onChange={(e) => handleSelectChange(e)}
      >
        <option value="" disabled>Select an option</option>
        {filteredUsers.length > 0 && filteredUsers.map((user, index) => (
          <option key={index} value={user.phone} className="cursor-pointer">
            {user.name.first} {user.name.last}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
};

export default UserList;
