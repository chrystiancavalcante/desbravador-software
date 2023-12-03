'use client';
// pages/seuComponente.tsx
import { useEffect, useState } from 'react';
import { useApiService } from '@/app/services/apiService';
import Search from '@/app/ui/search';

const SuaPagina = () => {
  const { getUserData, getUserRepos, getRepoDetails } = useApiService();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Exemplo de uso
    const fetchData = async () => {
      try {
        const userData = await getUserData(searchTerm);
        const userRepos = await getUserRepos('nomeUsuario');
        const repoDetails = await getRepoDetails('nomeUsuario/nomeRepositorio');

        console.log('Dados do usuário:', userData);
        console.log('Repositórios do usuário:', userRepos);
        console.log('Detalhes do repositório:', repoDetails);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (

    <p>Teste</p>
  );
};

export default SuaPagina;
