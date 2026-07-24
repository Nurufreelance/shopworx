import { MagnifyingGlassIcon, BellIcon, UserCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ProductionToolbarProps {
  onRefresh: () => void;
}

export const ProductionToolbar = ({ onRefresh }: ProductionToolbarProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search production..."
          className="w-[320px] pl-10 pr-4 py-1.5 border border-[#E5E7EB] rounded-full text-[12px] bg-[#F6F8FB] focus:outline-none focus:ring-1 focus:ring-[#3048A8]"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2 w-4 h-4 text-[#6B7280]" />
      </div>
      <button 
        onClick={onRefresh}
        className="p-1.5 text-[#6B7280] hover:text-[#1F2937] transition-colors"
      >
        <ArrowPathIcon className="w-5 h-5" />
      </button>
      <button className="p-1.5 text-[#6B7280] hover:text-[#1F2937] transition-colors relative">
        <BellIcon className="w-5 h-5" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-[#E53935] rounded-full" />
      </button>
      <button className="p-1">
        <UserCircleIcon className="w-7 h-7 text-[#6B7280]" />
      </button>
    </div>
  );
};