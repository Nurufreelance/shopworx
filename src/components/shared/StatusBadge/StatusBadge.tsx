import { cn } from "@utils/cn";

export interface StatusBadgeProps {
  status: string;
  label?: string;
}

export const StatusBadge = ({
  status,
  label,
}: StatusBadgeProps) => {
  const config = {
    running: "bg-green-100 text-green-700",
    idle: "bg-yellow-100 text-yellow-700",
    offline: "bg-red-100 text-red-700",
    maintenance: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full",
        config[status as keyof typeof config] ||
          "bg-gray-100 text-gray-700"
      )}
    >
      {label || status}
    </span>
  );
};