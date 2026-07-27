import {
  Bell,
  Search,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

export default function DashboardTopBar() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Manufacturing Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Real-time production monitoring and machine analytics
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <Search size={18} />
        </button>

        <button className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <CalendarDays size={18} />
        </button>

        <button className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <RefreshCw size={18} />
        </button>

        <button className="relative rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </div>
  );
}