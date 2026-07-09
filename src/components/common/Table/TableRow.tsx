import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TableRow({ children }: Props) {
  return (
    <tr
      className="
      transition-all
      duration-200
      hover:bg-blue-50
      hover:shadow-sm
    "
    >
      {children}
    </tr>
  );
}