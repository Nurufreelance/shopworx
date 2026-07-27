import { ProductionOrderStatus } from "../types/productionOrder";

interface Props {
  status: ProductionOrderStatus;
}

const styles: Record<
  ProductionOrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  running: {
    label: "Running",
    className:
      "bg-green-100 text-green-700 border border-green-200",
  },

  planned: {
    label: "Planned",
    className:
      "bg-blue-100 text-blue-700 border border-blue-200",
  },

  paused: {
    label: "Paused",
    className:
      "bg-amber-100 text-amber-700 border border-amber-200",
  },

  completed: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-100 text-red-700 border border-red-200",
  },
};

export default function OrderStatusBadge({
  status,
}: Props) {
  const badge = styles[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
    >
      <span
        className="mr-2 h-2 w-2 rounded-full bg-current opacity-80"
      />

      {badge.label}
    </span>
  );
}