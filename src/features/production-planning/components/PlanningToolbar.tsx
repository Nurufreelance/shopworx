import {
  FunnelIcon,
  ArrowsUpDownIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function PlanningToolbar() {
  return (
    <div className="flex items-center gap-3">

      <button className="h-10 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-medium text-[#344054] hover:bg-gray-50">
        <span className="flex items-center gap-2">
          <FunnelIcon className="w-4 h-4" />
          Filters
        </span>
      </button>

      <button className="h-10 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm font-medium text-[#344054] hover:bg-gray-50">
        <span className="flex items-center gap-2">
          <ArrowsUpDownIcon className="w-4 h-4" />
          Re-order
        </span>
      </button>

      <button className="h-10 rounded-lg bg-[#14B86A] px-5 text-sm font-semibold text-white hover:bg-[#11A45F]">
        <span className="flex items-center gap-2">
          <WrenchScrewdriverIcon className="w-4 h-4" />
          Equipment Change
        </span>
      </button>

      <button className="h-10 rounded-lg bg-[#3559B7] px-5 text-sm font-semibold text-white hover:bg-[#27489B]">
        <span className="flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />
          Add New Plan
        </span>
      </button>

    </div>
  );
}