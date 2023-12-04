"use client";

import Image from 'next/image';
import { useState } from 'react';
import Search from '@/app/ui/search';
import { useService } from '@/app/context/ApiContext';
import styles from '@/app/ui/styles.module.css';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import RepositoriesPage from '@/app/ui/repositories/RepositoriesPage';

export default function Pagina() {
  const { getUserData, setUserData, userData } = useService();
  const [username, setUsername] = useState('');

  const handleSearch = async (searchTerm: string) => {
    try {
      const fetchedUserData = await getUserData(searchTerm);
      setUserData(fetchedUserData);
      setUsername(searchTerm);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário', error);
    }
  };

  return (
    <div>
      {!userData && (<div >
        <div className={styles.texto}>
          Bora pesquisar? Preencha com o nome do usuário que deseja pesquisar..
        </div>
      </div>)}
      {!userData && <Search placeholder="Digite o nome de usuário" onSearch={handleSearch} />}
      {!userData && <div className='styles.centerImage p-6 md:w-4/5 md:px-28 md:py-12'>
        <Image
          src="/iniciar.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Imagem inicial para versão desktop"
        />
        <Image
          src="/iniciar.png"
          width={560}
          height={620}
          className="block md:hidden"
          alt="inicial para versão mobile"
        />
      </div>}
      <Suspense fallback={<TableRowSkeleton/>}>
        {username && <RepositoriesPage username={username} />}
      </Suspense>
    </div>
  );
}