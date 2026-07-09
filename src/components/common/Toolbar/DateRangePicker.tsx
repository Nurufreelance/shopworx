import { CalendarDays } from "lucide-react";

interface Props {
  value?: string;
}

export default function DateRangePicker({
  value = "07 Jul 2026 - 07 Jul 2026",
}: Props) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50">
      <CalendarDays
        size={18}
        className="text-[#3559B7]"
      />

      <span>{value}</span>
    </button>
  );
}