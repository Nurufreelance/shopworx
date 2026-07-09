import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TableHeader({ children }: Props) {
  return (
    <thead
      className="
      sticky
      top-0
      z-10
      bg-[#F5F7FA]
      border-b
      border-gray-200
    "
    >
      {children}
    </thead>
  );
}