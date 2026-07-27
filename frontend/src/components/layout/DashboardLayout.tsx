// src/components/layout/DashboardLayout.tsx

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';

// These should match the sidebar widths from SidebarStyles.ts
const SIDEBAR_WIDTH_OPEN = 280;    // Matches SIDEBAR.WIDTH
const SIDEBAR_WIDTH_COLLAPSED = 85; // Matches SIDEBAR.COLLAPSED_WIDTH

export const DashboardLayout = () => {
  const { sidebarOpen, isMobile } = useMobile();

  // Calculate the current sidebar width
  const sidebarWidth = isMobile 
    ? 0 
    : (sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_COLLAPSED);

  return (
    <div className="flex h-screen bg-[#F6F8FB] overflow-hidden">
      {/* Sidebar - fixed position */}
      <Sidebar />
      
      {/* Main content - dynamically positioned to the right of sidebar */}
      <div 
        className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isMobile ? 0 : sidebarWidth,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
          filter: isMobile && sidebarOpen ? 'blur(4px)' : 'none',
          transition: 'margin-left 300ms ease-in-out, width 300ms ease-in-out, filter 300ms ease-in-out',
        }}
      >
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#F6F8FB]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};