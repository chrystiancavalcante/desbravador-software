import React from 'react';
import RepositoriesPage from '@/app/ui/repositories/RepositoriesPage';

const RepoList: React.FC = () => {
    return (
        <div>
            <RepositoriesPage username={''} />
        </div>
    );
}

export default RepoList;