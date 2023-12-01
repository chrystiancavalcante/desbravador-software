'use client'
import { FC } from 'react';
import Link from 'next/link';
import { useService } from '@/app/context/ApiContext';
import UserSidebar from '@/app/ui/sidenav/useSideBar';
import NavLinks from './nav-links';

interface SideNavProps {
  userData: any | null; 
}

const SideNav: FC<SideNavProps> = () => {
  const { userData } = useService();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link href="/">
        <div className="mb-2 flex h-40 items-end justify-start rounded-md bg-blue-600 p-4 md:h-60">
          <div className="w-32 text-white md:w-40">
            {userData && userData.avatar_url ? (
              <img
                src={userData.avatar_url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  objectFit: 'cover',
                  width: '150px',
                  height: '150px',
                  margin: '15px auto',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '100%',
                }}
                alt="User Avatar"
              />
            ):(
              <img
                src='/perfil_padrao.png'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  objectFit: 'cover',
                  width: '150px',
                  height: '150px',
                  margin: '15px auto',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '100%',
                }}
                alt="User Avatar"
              />
            )}
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <UserSidebar />
        <NavLinks/>
      </div>
    </div>
  );
};

export default SideNav;
