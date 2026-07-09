import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  );
}