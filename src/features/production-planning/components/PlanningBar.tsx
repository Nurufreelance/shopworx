interface Props {
  start: number;
  duration: number;
  label: string;
  status: "running" | "stopped";
}

export default function PlanningBar({
  start,
  duration,
  label,
  status,
}: Props) {
  const running = status === "running";

  return (
    <div
      className="
        absolute
        top-1/2
        -translate-y-1/2
        h-9
        rounded-md
        shadow-sm
        overflow-hidden
        flex
        items-center
      "
      style={{
        left: `${start * 64 + 6}px`,
        width: `${duration * 64 - 12}px`,
        background: running ? "#2F6BFF" : "#94A3B8",
      }}
    >
      <div
        className={`w-2 h-full ${
          running
            ? "bg-[#16A34A]"
            : "bg-[#DC2626]"
        }`}
      />

      <span className="px-3 text-xs font-semibold text-white truncate">
        {label}
      </span>
    </div>
  );
}