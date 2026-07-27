import { HomeIcon, ChartBarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface BottomNavItem {
  icon: any;
  label: string;
  isActive?: boolean;
}

const BottomNavItem = ({ icon: Icon, label, isActive }: BottomNavItem) => (
  <button className={`flex flex-col items-center ${isActive ? 'text-[#2F6BFF]' : 'text-[#6B7280]'}`}>
    <Icon className="w-5 h-5" />
    <span className="text-[10px]">{label}</span>
  </button>
);

export const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] flex justify-around py-2 z-20">
      <BottomNavItem icon={HomeIcon} label="Home" isActive />
      <BottomNavItem icon={ChartBarIcon} label="Insights" />
      <BottomNavItem icon={UserCircleIcon} label="Account" />
    </div>
  );
};