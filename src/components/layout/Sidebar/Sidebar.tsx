import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ClockIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

const navigation = [
  // ================= MAIN =================
  { id: 'home', label: 'Home', icon: HomeIcon, path: '/', section: 'main' },
  { id: 'production-planning', label: 'Production Planning', icon: ClipboardDocumentListIcon, path: '/production-planning', section: 'main' },
  { id: 'production-log', label: 'Production Log', icon: DocumentTextIcon, path: '/production-log', section: 'main' },
  { id: 'downtime-log', label: 'Downtime Log', icon: ClockIcon, path: '/downtime-log', section: 'main' },
  
  // ================= DASHBOARDS =================
  { id: 'live-shopfloor', label: 'Live Shopfloor', icon: GlobeAltIcon, path: '/live-shopfloor', section: 'dashboards' },
  
  // ================= REPORTS =================
  { id: 'reports-production', label: 'Production', icon: ChartBarIcon, path: '/reports/production', section: 'reports' },
  { id: 'reports-downtime', label: 'Downtime', icon: ClockIcon, path: '/reports/downtime', section: 'reports' },
  { id: 'reports-quality', label: 'Quality', icon: ShieldCheckIcon, path: '/reports/quality', section: 'reports' },
  { id: 'reports-performance', label: 'Performance', icon: BoltIcon, path: '/reports/performance', section: 'reports' },
  
  // ================= SYSTEM =================
  { id: 'master-data', label: 'Master Data', icon: Squares2X2Icon, path: '/master-data', section: 'system' },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, path: '/settings', section: 'system' },
];

// ============================================
// NAVIGATION ITEM - BIGGER FONT, FULL HOVER
// ============================================
function NavItem({ item, onClick }: { item: any; onClick?: () => void }) {
  const Icon = item.icon;
  const { closeSidebar } = useMobile();
  
  const handleClick = () => {
    if (onClick) onClick();
    closeSidebar();
  };

  return (
     <Tooltip content={item.label} position="right" delay={200}>
    <NavLink
      to={item.path}
      onClick={handleClick}
      className={({ isActive }) =>
        cn(
          // ⭐ BIGGER FONT: text-[15px] (was 14px)
          "flex items-center gap-3 h-11 px-4 rounded-[6px] text-[15px] font-medium transition-all duration-150",
          // ⭐ FULL WIDTH HOVER
          isActive
            ? 'bg-[#F97316] text-white' // Orange active
            : 'text-[#C4CBD4] hover:bg-[#2A2D35] hover:text-white'
        )
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span>{item.label}</span>
    </NavLink>
    </Tooltip>
  );
}

// ============================================
// SIDEBAR COMPONENT
// ============================================
export const Sidebar = () => {
  const { sidebarOpen, closeSidebar, isMobile, isDesktop } = useMobile();

  // Desktop: always visible
  if (isDesktop) {
    return <DesktopSidebar />;
  }

  // Mobile: slides in/out - NO DARK OVERLAY
  return (
    <>
      {/* ⭐ REMOVED: Dark overlay - it's not in the real ShopWorx */}
      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-[280px] bg-[#1F2229] flex flex-col z-50",
        "transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo with Close Button */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-[#2B2E36]">
          <span className="text-white text-[20px] font-bold tracking-wide">ShopWorx</span>
          <button
            onClick={closeSidebar}
            className="p-1 rounded-lg hover:bg-[#2A2D35] transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <SidebarContent onItemClick={closeSidebar} />

        {/* User Profile */}
        <div className="border-t border-[#2B2E36] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2F6BFF] flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <div>
              <p className="text-white text-[13px] font-medium">John Doe</p>
              <p className="text-[#8C96A3] text-[10px]">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// DESKTOP SIDEBAR
// ============================================
function DesktopSidebar() {
  return (
    <aside className="w-[250px] h-screen bg-[#1F2229] flex flex-col flex-shrink-0 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center h-14 px-5 border-b border-[#2B2E36]">
        <span className="text-white text-[20px] font-bold tracking-wide">ShopWorx</span>
      </div>

      <SidebarContent />

      {/* User Profile */}
      <div className="border-t border-[#2B2E36] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2F6BFF] flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <div>
            <p className="text-white text-[13px] font-medium">John Doe</p>
            <p className="text-[#8C96A3] text-[10px]">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ============================================
// SIDEBAR CONTENT
// ============================================
function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto py-2 px-3">
      {/* MAIN SECTION */}
      {navigation
        .filter(item => item.section === 'main')
        .map((item) => (
          <NavItem key={item.id} item={item} onClick={onItemClick} />
        ))}

      {/* DASHBOARDS SECTION */}
      <div className="mt-3">
        <p className="px-3 mb-1 text-[11px] font-semibold tracking-[1.2px] uppercase text-[#6B7A8A]">
          DASHBOARDS
        </p>
        {navigation
          .filter(item => item.section === 'dashboards')
          .map((item) => (
            <NavItem key={item.id} item={item} onClick={onItemClick} />
          ))}
      </div>

      {/* REPORTS SECTION */}
      <div className="mt-3">
        <p className="px-3 mb-1 text-[11px] font-semibold tracking-[1.2px] uppercase text-[#6B7A8A]">
          REPORTS
        </p>
        {navigation
          .filter(item => item.section === 'reports')
          .map((item) => (
            <NavItem key={item.id} item={item} onClick={onItemClick} />
          ))}
      </div>

      {/* SYSTEM SECTION */}
      {navigation
        .filter(item => item.section === 'system')
        .map((item) => (
          <NavItem key={item.id} item={item} onClick={onItemClick} />
        ))}
    </nav>
  );
}