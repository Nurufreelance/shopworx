import { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  header?: boolean;
  align?: "left" | "center" | "right";
}

export default function TableCell({
  children,
  header = false,
  align = "left",
}: TableCellProps) {
  const Tag = header ? "th" : "td";

  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      className={`
        px-4
        py-3
        whitespace-nowrap
        ${alignment[align]}
        ${
          header
            ? "text-xs font-semibold uppercase tracking-wide text-gray-500"
            : "text-sm text-gray-700"
        }
      `}
    >
      {children}
    </Tag>
  );
}