// src/components/layout/Sidebar/Sidebar.tsx

import { NavLink, useLocation } from 'react-router-dom';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ClockIcon,
  Squares2X2Icon,
  ChartBarIcon,
  ChartPieIcon,
  CheckCircleIcon,
  ChartBarSquareIcon,
  ServerIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  label: string;
  path?: string;
  icon?: React.ComponentType<{ className?: string }>;
  section?: string;
  items?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Home',
    path: '/home',
    icon: HomeIcon,
  },
  {
    label: 'Production Planning',
    path: '/production-planning',
    icon: ClipboardDocumentListIcon,
  },
  {
    label: 'Production Log',
    path: '/production-log',
    icon: DocumentTextIcon,
  },
  {
    label: 'Downtime Log',
    path: '/downtime-log',
    icon: ClockIcon,
  },
  {
    section: 'DASHBOARDS',
    items: [
      {
        label: 'Live Shopfloor',
        path: '/live-shopfloor',
        icon: Squares2X2Icon,
      },
    ],
  },
  {
    section: 'REPORTS',
    items: [
      {
        label: 'Production',
        path: '/reports/production',
        icon: ChartBarIcon,
      },
      {
        label: 'Downtime',
        path: '/reports/downtime',
        icon: ChartPieIcon,
      },
      {
        label: 'Quality',
        path: '/reports/quality',
        icon: CheckCircleIcon,
      },
      {
        label: 'Performance',
        path: '/reports/performance',
        icon: ChartBarSquareIcon,
      },
    ],
  },
  // ✅ Master Data with a divider line and space before it
  {
    label: 'Master Data',
    path: '/master-data',
    icon: ServerIcon,
  },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, closeSidebar, isMobile, isDesktop } = useMobile();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Find the index of Master Data to add divider before it
  const masterDataIndex = navigationItems.findIndex(item => item.label === 'Master Data');

  return (
    <>
      {/* Hamburger Menu Button - Top Left (Mobile & Tablet only) */}
      {!isDesktop && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {!sidebarOpen ? (
            <Bars3Icon className="w-6 h-6 text-white" />
          ) : (
            <XMarkIcon className="w-6 h-6 text-white" />
          )}
        </button>
      )}

      {/* Overlay for mobile/tablet */}
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Fixed, no scroll */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-[#1a1a2e] transition-all duration-300 ease-in-out flex flex-col overflow-hidden",
          // Mobile/Tablet: slide in/out
          !isDesktop ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          // Desktop: always visible, width changes based on state
          isDesktop && sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo - ShopWorx - Fixed at top */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-gray-700 flex-shrink-0",
          isDesktop && !sidebarOpen && "justify-center px-2"
        )}>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#2F6BFF] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">SW</span>
            </div>
            {(sidebarOpen || !isDesktop) && (
              <span className="text-xl font-bold text-white">ShopWorx</span>
            )}
          </div>
        </div>

        {/* Navigation - No scrollbar, content will be cut if too long */}
        <nav className="flex-1 overflow-hidden py-4 px-3">
          <ul className="space-y-0.5">
            {navigationItems.map((item, index) => {
              // Section header
              if (item.section) {
                return (
                  <li key={`section-${index}`} className="mt-5 first:mt-0">
                    {sidebarOpen && (
                      <div className="px-3 py-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {item.section}
                        </span>
                      </div>
                    )}
                    {!sidebarOpen && isDesktop && <div className="h-3" />}
                    <ul className="space-y-0.5">
                      {item.items?.map((subItem, subIndex) => (
                        <li key={`sub-${index}-${subIndex}`}>
                          <NavLink
                            to={subItem.path || '#'}
                            onClick={() => !isDesktop && closeSidebar()}
                            className={({ isActive: isLinkActive }) => `
                              group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                              transition-all duration-200
                              ${isLinkActive || isActive(subItem.path || '')
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                              }
                              ${isDesktop && !sidebarOpen ? 'justify-center' : ''}
                            `}
                          >
                            {subItem.icon && (
                              <subItem.icon className={cn(
                                "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                                isActive(subItem.path || '') 
                                  ? 'text-white' 
                                  : 'text-gray-400 group-hover:text-white'
                              )} />
                            )}
                            {(sidebarOpen || !isDesktop) && (
                              <span className="text-sm font-medium">{subItem.label}</span>
                            )}
                            
                            {/* Tooltip */}
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                              {subItem.label}
                            </div>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // ✅ Check if this is Master Data (last item) - add divider and space
              const isMasterData = item.label === 'Master Data';
              const isLastItem = index === navigationItems.length - 1;
              
              return (
                <li key={item.label}>
                  {/* ✅ Divider line and space before Master Data */}
                  {isMasterData && (
                    <div className={cn(
                      "relative py-3",
                      sidebarOpen ? "px-3" : "px-1"
                    )}>
                      <div className="border-t border-gray-700/50" />
                    </div>
                  )}
                  
                  <NavLink
                    to={item.path || '#'}
                    onClick={() => !isDesktop && closeSidebar()}
                    className={({ isActive: isLinkActive }) => `
                      group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                      transition-all duration-200
                      ${isLinkActive || isActive(item.path || '')
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }
                      ${isDesktop && !sidebarOpen ? 'justify-center' : ''}
                    `}
                  >
                    {item.icon && (
                      <item.icon className={cn(
                        "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                        isActive(item.path || '') 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-white'
                      )} />
                    )}
                    {(sidebarOpen || !isDesktop) && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};