  import SideNav from '@/app/ui/sidenav/sidenav';
  import { ApiProvider } from '@/app/context/ApiContext';
  
  export default function Layout({ children }: { children: React.ReactNode }) {
    return (
  <ApiProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav userData={undefined} />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
  </ApiProvider>
  
    );
  }