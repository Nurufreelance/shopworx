import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export default function ToolbarButton({
  icon,
  children,
  variant = "outline",
}: Props) {
  const styles = {
    primary:
      "bg-[#3559B7] text-white hover:bg-[#27479b]",

    secondary:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border border-gray-300 bg-white hover:bg-gray-50",
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]}`}
    >
      {icon}

      {children}
    </button>
  );
}