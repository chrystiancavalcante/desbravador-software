'use client'
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="mb-2 flex items-end justify-start rounded-md bg-blue-600 p-4 md:h-60">
          <div className="w-32 text-white md:w-40">
            {userData && userData.avatar_url ? (
              <Image
                src={userData.avatar_url}
                width={150}
                height={150}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  objectFit: 'cover',
                  margin: '15px auto',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '100%',
                }}
                alt="User Avatar"
              />
            ) : (
              <Image
                src='/perfil_padrao.png'
                width={150}
                height={150}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  objectFit: 'cover',
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
          <div className="block md:hidden h-auto w-full grow rounded-md text-white text-left ml-4">
            <UserSidebar />
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className='hidden md:block h-auto w-full grow rounded-md bg-gray-50'>
          <UserSidebar />
        </div>
        <NavLinks />
      </div>
    </div>
  );
};

export default SideNav;
