'use client'

import React from 'react';
import { useService } from '@/app/context/ApiContext';

const UserSidebar: React.FC = () => {
  const { userData } = useService();

  return (
    <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
      {userData && <span>{userData.login}</span>}
      {userData && <p>Followers: {userData.followers}</p>}
      {userData && <p>Following: {userData.following}</p>}
      {userData && <p>Email: {userData.email}</p>}
      {userData && <p>Bio: {userData.bio}</p>}
    </div>
  );
};

export default UserSidebar;

