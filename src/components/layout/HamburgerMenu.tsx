import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';

interface HamburgerMenuProps {
  className?: string;
}

export const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
  const { sidebarOpen, toggleSidebar } = useMobile();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center rounded-lg",
        "hover:bg-gray-800/50 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary-500",
        className
      )}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <span className={cn(
          "block h-0.5 bg-white rounded-full transition-all duration-300",
          sidebarOpen ? "rotate-45 translate-y-1.5" : ""
        )} />
        <span className={cn(
          "block h-0.5 bg-white rounded-full transition-all duration-300",
          sidebarOpen ? "opacity-0" : ""
        )} />
        <span className={cn(
          "block h-0.5 bg-white rounded-full transition-all duration-300",
          sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
        )} />
      </div>
    </button>
  );
};