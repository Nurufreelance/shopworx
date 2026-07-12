import {
  PlusIcon,
  ArrowPathIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export default function ProductionOrderHeader() {
  const today = new Date();

  return (
    <div className="border-b border-[#E5E7EB] bg-white">

      <div className="flex items-center justify-between px-8 py-6">

        <div>

          <h1 className="text-[28px] font-bold text-[#1F2937]">
            Production Orders
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            {today.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            className="
              flex items-center gap-2
              rounded-lg
              border border-[#D1D5DB]
              bg-white
              px-4 py-2.5
              text-sm font-medium
              text-[#374151]
              hover:bg-gray-50
            "
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>

          <button
            className="
              flex items-center gap-2
              rounded-lg
              border border-[#D1D5DB]
              bg-white
              px-4 py-2.5
              text-sm font-medium
              text-[#374151]
              hover:bg-gray-50
            "
          >
            <FunnelIcon className="h-5 w-5" />
            Filter
          </button>

          <button
            className="
              flex items-center gap-2
              rounded-lg
              bg-[#F97316]
              px-5 py-2.5
              text-sm font-semibold
              text-white
              hover:bg-[#EA580C]
            "
          >
            <PlusIcon className="h-5 w-5" />
            New Order
          </button>

        </div>

      </div>

    </div>
  );
}