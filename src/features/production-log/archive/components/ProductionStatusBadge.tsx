interface Props {
  status: "Production" | "Setup" | "Maintenance" | "Idle";
}

const styles = {
  Production:
    "bg-green-100 text-green-700 border-green-200",

  Setup:
    "bg-blue-100 text-blue-700 border-blue-200",

  Maintenance:
    "bg-orange-100 text-orange-700 border-orange-200",

  Idle:
    "bg-gray-100 text-gray-700 border-gray-200",
};

export default function ProductionStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      <span
        className="
          mr-2
          h-2
          w-2
          rounded-full
          bg-current
        "
      />

      {status}
    </span>
  );
}