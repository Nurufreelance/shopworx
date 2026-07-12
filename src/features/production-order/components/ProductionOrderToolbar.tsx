import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function ProductionOrderToolbar() {
  return (
    <div className="border-b border-[#E5E7EB] bg-[#F8FAFC] px-8 py-4">

      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Search */}

        <div className="relative w-full max-w-md">

          <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />

          <input
            type="text"
            placeholder="Search order, machine, part..."
            className="
              h-11
              w-full
              rounded-lg
              border
              border-[#D1D5DB]
              bg-white
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-[#F97316]
            "
          />

        </div>

        {/* Filters */}

        <div className="flex items-center gap-3">

          <select className="h-11 rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm">
            <option>All Status</option>
            <option>Running</option>
            <option>Planned</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>

          <select className="h-11 rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm">
            <option>All Machines</option>
          </select>

          <button
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-lg
              border
              border-[#D1D5DB]
              bg-white
              px-4
              text-sm
              hover:bg-gray-50
            "
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            More Filters
          </button>

        </div>

      </div>

    </div>
  );
}