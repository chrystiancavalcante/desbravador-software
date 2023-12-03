'use client'

import React from 'react';
import { useService } from '@/app/context/ApiContext';

const UserSidebar: React.FC = () => {
  const { userData } = useService();

  return (
    <>
    <div>
      {userData && <strong>{userData.login}</strong>}
      {userData && <p><strong>Followers: </strong>{userData.followers}</p>}
      {userData && <p><strong>Following: </strong>{userData.following}</p>}
      {userData && <p><strong>Email: </strong>{userData.email}</p>}
      {userData && <p><strong>Bio: </strong>{userData.bio}</p>}
    </div>
    </>
  );
};

export default UserSidebar;

