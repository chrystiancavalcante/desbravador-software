import React from 'react';
import { ApiProvider } from '@/app/context/ApiContext';
import '@/app/ui/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children }: RootLayoutProps) => {
  return (
    <ApiProvider>
      <html lang="pt-br">
        <body>{children}</body>
      </html>
    </ApiProvider>
  );
};

export default RootLayout;

