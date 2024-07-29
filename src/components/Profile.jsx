import React, { useState, useEffect } from 'react';
import NavbarDefault from './NavbarDefault';
import { CloudDownloadIcon } from '@heroicons/react/solid';

const Profile = () => {
  // State to store userInfo and loading status
  // const [userInfo, setUserInfo] = useState({ userName: '', email: '' });
  // const [loading, setLoading] = useState(true);
    const storedUserInfo = localStorage.getItem('userInfo');
    
        const parsedUserInfo = JSON.parse(storedUserInfo);
        console.log(parsedUserInfo)
        
    
  
  return (
    <>
      <NavbarDefault />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
              <p className='text-2xl '><strong>Username:</strong> {parsedUserInfo.name}</p>
              <p className='text-2xl'><strong>Email:</strong> {parsedUserInfo.email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
