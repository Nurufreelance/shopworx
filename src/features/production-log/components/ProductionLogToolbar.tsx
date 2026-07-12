import {
  CalendarDaysIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function ProductionLogToolbar() {
  return (
    <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#D9DEE7] bg-white p-4 shadow-sm">

      {/* Left */}

      <div className="flex flex-wrap items-center gap-3">

        <select
          className="
            h-10
            rounded-lg
            border
            border-[#D9DEE7]
            bg-white
            px-3
            text-sm
            outline-none
            focus:border-[#3559B7]
          "
        >
          <option>Shift 1</option>
          <option>Shift 2</option>
          <option>Shift 3</option>
        </select>

        <div className="relative">

          <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="date"
            className="
              h-10
              rounded-lg
              border
              border-[#D9DEE7]
              pl-10
              pr-3
              text-sm
              outline-none
              focus:border-[#3559B7]
            "
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">

        <div className="relative">

          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Search..."
            className="
              h-10
              w-64
              rounded-lg
              border
              border-[#D9DEE7]
              pl-10
              pr-3
              text-sm
              outline-none
              focus:border-[#3559B7]
            "
          />

        </div>

        <button
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-lg
            border
            border-[#D9DEE7]
            px-4
            text-sm
            transition
            hover:bg-gray-50
          "
        >
          <FunnelIcon className="h-5 w-5" />
          Filter
        </button>

        <button
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-lg
            border
            border-[#D9DEE7]
            px-4
            text-sm
            transition
            hover:bg-gray-50
          "
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </button>

        <button
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-lg
            bg-[#3559B7]
            px-4
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#29489A]
          "
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Export
        </button>

      </div>

    </section>
  );
}