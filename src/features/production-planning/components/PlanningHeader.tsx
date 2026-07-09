import { Info, RefreshCw, Settings2 } from "lucide-react";
import { PageTitle } from "@components/common/Toolbar";

export default function PlanningHeader() {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white border border-gray-200 px-6 py-5 shadow-sm">
      <PageTitle
        title="Production Planning"
        subtitle="Manage production plans across all machines"
        icon={<Info size={18} className="text-gray-400" />}
      />

      <div className="flex gap-3">
        <button className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100">
          <RefreshCw size={18} />
        </button>

        <button className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100">
          <Settings2 size={18} />
        </button>
      </div>
    </div>
  );
}