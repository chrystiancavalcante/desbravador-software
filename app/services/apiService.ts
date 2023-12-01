import axios from 'axios';

const apiBaseUrl = 'https://api.github.com';

export const useApiService = () => {
  const getUserData = async (username: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter dados do usuário', error);
      throw error;
    }
  };

  const getUserRepos = async (username: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/${username}/repos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter repositórios do usuário', error);
      throw error;
    }
  };

  const getRepoDetails = async (repoFullName: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/repos/${repoFullName}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter detalhes do repositório', error);
      throw error;
    }
  };

  return { getUserData, getUserRepos, getRepoDetails };
};
