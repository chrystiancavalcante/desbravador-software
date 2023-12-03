'use client';

import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useService } from '@/app/context/ApiContext';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import styles from '@/app/ui/styles.module.css'; 

interface Repo {
  html_url: string;
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

interface ListProps {
  username: string;
} 

const RepositoriesList: React.FC<ListProps> = ({ username }: ListProps) => {
  const { getUserRepos, getRepoDetails } = useService();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [visibleRepos, setVisibleRepos] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRepos = await getUserRepos(username);
        setRepos(userRepos);
      } catch (error) {
        console.error('Erro ao obter repositórios do usuário', error);
      }
    };

    fetchData();
  }, [getUserRepos, username]);

  const handleVerDetalhes = async (repoFullName: string) => {
    console.log('Detalhes do repositório:', repoFullName);
    try {
      const repoDetails = await getRepoDetails(repoFullName);
      setSelectedRepo(repoDetails);
    } catch (error) {
      console.error('Erro ao obter detalhes do repositório', error);
    }
  };

  const handleLoadMore = async () => {
    try {
      setVisibleRepos((prevVisibleRepos) => prevVisibleRepos + 5);
    } catch (error) {
      console.error('Erro ao carregar mais repositórios', error);
    }
  };

  return (
    <>
      {selectedRepo ? (
        <div className="mt-4">
          <div>
            <div className={styles.texto}>
          <h2>Detalhes do Repositório</h2>
            </div>
            </div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h2 className="ml-2 text-sm font-medium">Repositório - <strong>{selectedRepo.name}</strong></h2>
            </div>

            <p style={{ wordWrap: 'break-word' }} className={`${lusitana.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            > {selectedRepo.description || 'Sem descrição'}
            </p>

            <p className={`${lusitana.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}><strong>Estrelas:</strong> {selectedRepo.stargazers_count}</p>
            <p className={`${lusitana.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}><strong>Linguagem:</strong> {selectedRepo.language || 'Não especificada'}</p>

                <Link href={selectedRepo.html_url}>
                  <p className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"><strong>Ver no GitHub</strong>
                  </p>
                </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nome
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Descrição
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Estrelas
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Linguagem
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Ver detalhes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                
                  {repos.slice(0, visibleRepos).map((repo) => (
                    <tr
                      key={repo.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p><strong>{repo.name}</strong></p>
                        </div>
                      </td>
                      <td className="whitespace-wrap px-3 py-3">
                        <p>{repo.description ? repo.description : "Sem descrição"}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p><strong>Estrelas:</strong> {repo.stargazers_count}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <p><strong></strong> {repo.language ? repo.language : "Não especificada"}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <button
                          onClick={() => handleVerDetalhes(username + '/' + repo.name)}
                          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                        >
                          <MagnifyingGlassIcon className="h-5 md:ml-4" />
                           Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleRepos < repos.length && (
                <button onClick={handleLoadMore} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                  <div className="hidden md:block">Ver mais ...</div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default RepositoriesList;