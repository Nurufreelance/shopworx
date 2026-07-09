import { LayoutGrid, List } from "lucide-react";

export default function ViewSwitcher() {
  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-300">
      <button className="bg-[#3559B7] p-2 text-white">
        <LayoutGrid size={18} />
      </button>

      <button className="bg-white p-2 hover:bg-gray-50">
        <List size={18} />
      </button>
    </div>
  );
}