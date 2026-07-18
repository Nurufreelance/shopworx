import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';

export const DashboardLayout = () => {
  const { sidebarOpen, isMobile } = useMobile();

  return (
    <div className="flex h-screen bg-[#F6F8FB] overflow-hidden">
      <Sidebar />
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        isMobile && sidebarOpen ? "blur-sm" : ""
      )}>
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};