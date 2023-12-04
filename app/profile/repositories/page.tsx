import React from 'react';
import RepositoriesPage from '@/app/ui/repositories/RepositoriesPage';

const RepoList: React.FC<{ username: string }> = ({ username }) => {
    return (
        <div>
            <RepositoriesPage username={username} />
        </div>
    );
}

export default RepoList;