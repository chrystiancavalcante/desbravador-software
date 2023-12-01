'use client'

import axios from 'axios';
import React, { createContext, useContext, ReactNode, useState } from 'react';

const apiBaseUrl = 'https://api.github.com';

interface UserDataContextProps {
  userData: any | null;
  setUserData: (data: any | null) => void;
}

interface SearchContextProps {
  searchResults: any | null;
  setSearchResults: (data: any | null) => void;
}

interface ApiContextProps extends UserDataContextProps, SearchContextProps {
  getUserData: (username: string) => Promise<any>;
  getUserRepos: (username: string) => Promise<any>;
  getRepoDetails: (repoFullName: string) => Promise<any>;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any | null>(null);
  const [searchResults, setSearchResults] = useState<any | null>(null);

  const getUserData = async (username: string) => {
    try {
      console.log('Chamando getUserData para', username);
      const response = await axios.get(`${apiBaseUrl}/users/${username}`);
      setUserData(response.data);
      console.log('Resposta de getUserData:', response.data);
      return response.data; // Adicionado para retornar os dados do usuário
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

  const apiService: ApiContextProps = {
    userData,
    setUserData,
    searchResults,
    setSearchResults,
    getUserData,
    getUserRepos,
    getRepoDetails,
  };

  return <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>;
};

export const useService = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiService must be used within an ApiProvider');
  }
  return context;
};

