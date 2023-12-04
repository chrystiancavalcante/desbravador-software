'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
  username: string;
}

const RepositoriesPage: React.FC<{ username: string }> = ({ username }) => {
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

  const sortRepos = (key: keyof Repo) => {
    const isAscending = reposOrder.key === key && reposOrder.order === 'asc';
    const newOrder = isAscending ? 'desc' : 'asc';

    const sortedRepos = [...repos].sort((a, b) => {
      if (key === 'name') {
        return isAscending ? (a[key]?.localeCompare(b[key] ?? '') || 0) : (b[key]?.localeCompare(a[key] ?? '') || 0);
      }

      const aValue = typeof a[key] === 'number' ? a[key] : 0;
      const bValue = typeof b[key] === 'number' ? b[key] : 0;
      if (aValue === null || aValue === undefined) return isAscending ? 1 : -1;
      if (bValue === null || bValue === undefined) return isAscending ? -1 : 1;
  
      return isAscending ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    });

    setRepos(sortedRepos);
    setReposOrder({ key, order: newOrder });
  };

  const [reposOrder, setReposOrder] = useState<{ key: keyof Repo | null; order: 'asc' | 'desc' }>({
    key: null,
    order: 'asc',
  });

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
            <button
              onClick={() => setSelectedRepo(null)}
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <ArrowLeftIcon className="w-5 md:w-6" />
            </button>
          <div className={styles.texto}>
            <h2>Detalhes do Repositório</h2>
          </div>
          <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
              <h2 className={`${lusitana.className}whitespace-wrap px-4 py-5 text-center text-2xl`}><strong>{selectedRepo.name}</strong></h2>
            </div>

            <p className={`${lusitana.className} whitespace-wrap bg-white px-4 py-5 text-center text-2xl`}
            > <h2 className='text-gray-500'>{selectedRepo.description || 'Sem descrição'}</h2>
            </p>

            <p className={`${lusitana.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}><strong>Estrelas: </strong>
              {selectedRepo.stargazers_count}
            </p>
            <p className={`${lusitana.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}><strong>Linguagem:</strong> {selectedRepo.language || 'Não especificada'}</p>

            <Link href={selectedRepo.html_url}>
              <p className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"><strong>Ver no GitHub</strong>
              </p>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full">
            <h1 className={`${lusitana.className} ${styles.texto} mb-8 text-xl md:text-2xl`}>
              Repositórios
            </h1>
            <div className="mt-6 flow-root">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                      {repos.slice(0, visibleRepos).map((repo) => (
                        <div
                          key={repo.id}
                          className="mb-2 w-full rounded-md bg-white p-4"
                        >
                          <div className="whitespace-wrap flex items-center justify-between border-b">
                            <div>
                              <div className="mb-2 flex items-center">
                                <div className="flex items-center gap-3">
                                  <p><strong>{repo.name}</strong></p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">
                                <strong>Descrição:</strong> {repo.description ? repo.description : "Sem descrição"}
                              </p>
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between border-b py-5">
                            <p className="text-sm text-gray-500">
                              <strong>Estrelas:</strong> {repo.stargazers_count}
                            </p>
                          </div>
                          <div className="pt-4 text-sm">
                            <p className="text-sm text-gray-500"><strong>Linguagem:</strong> {repo.language ? repo.language : "Não especificada"}</p>
                          </div>
                          <div className="whitespace-nowrap px-3 py-3">
                            <button
                              onClick={() => handleVerDetalhes(username + '/' + repo.name)}
                              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                            >
                              <MagnifyingGlassIcon className="h-5 md:ml-4" />
                              Detalhes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                      <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                        <tr>
                          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                          <button onClick={() => sortRepos('name')}>Nome ({reposOrder.key === 'name' ? reposOrder.order : 'asc'})</button>
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Descrição
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                          <button onClick={() => sortRepos('stargazers_count')}> Estrelas({reposOrder.key === 'stargazers_count' ? reposOrder.order : 'asc'})</button>
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Linguagem
                          </th>
                          <th scope="col" className="px-4 py-5 font-medium">
                            Ver Detalhes
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 text-gray-900">
                        {repos.slice(0, visibleRepos).map((repo) => (
                          <tr key={repo.id} className="group">
                            <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                              <div className="flex items-center gap-3">
                                <p><strong>{repo.name}</strong></p>
                              </div>
                            </td>
                            <td className="whitespace-wrap bg-white px-4 py-5 text-sm">
                              {repo.description ? repo.description : "Sem descrição"}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                              {repo.stargazers_count}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                              <p><strong></strong> {repo.language ? repo.language : "Não especificada"}</p>
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
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
                        <div className=" md:block">Ver mais ...</div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default RepositoriesPage;