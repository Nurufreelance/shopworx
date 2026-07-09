import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
}

export default function SearchBox({
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative w-80">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-[#3559B7] focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}