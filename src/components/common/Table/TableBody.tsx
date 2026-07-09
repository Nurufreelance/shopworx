import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TableBody({ children }: Props) {
  return (
    <tbody
      className="
      divide-y
      divide-gray-100
      [&>tr:nth-child(even)]:bg-gray-50
    "
    >
      {children}
    </tbody>
  );
}