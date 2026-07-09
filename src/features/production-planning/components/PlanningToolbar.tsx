import {
  SearchBox,
  DateRangePicker,
  ToolbarButton,
  ViewSwitcher,
} from "@components/common/Toolbar";

import {
  Filter,
  Plus,
  ArrowUpDown,
  Wrench,
} from "lucide-react";

export default function PlanningToolbar() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex flex-wrap items-center justify-between gap-5">

        {/* Left */}

        <div className="flex flex-wrap items-center gap-4">

          <SearchBox placeholder="Search plan, part, machine..." />

          <DateRangePicker />

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          <ToolbarButton
            icon={<Filter size={16} />}
          >
            Filters
          </ToolbarButton>

          <ToolbarButton
            icon={<ArrowUpDown size={16} />}
          >
            Re-order
          </ToolbarButton>

          <ToolbarButton
            variant="secondary"
            icon={<Wrench size={16} />}
          >
            Equipment Change
          </ToolbarButton>

          <ToolbarButton
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add New Plan
          </ToolbarButton>

          <ViewSwitcher />

        </div>

      </div>

    </div>
  );
}