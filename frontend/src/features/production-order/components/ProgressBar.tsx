interface ProgressBarProps {
  plannedQty: number;
  producedQty: number;
}

export default function ProgressBar({
  plannedQty,
  producedQty,
}: ProgressBarProps) {
  const percentage =
    plannedQty === 0
      ? 0
      : Math.min(
          Math.round((producedQty / plannedQty) * 100),
          100
        );

  let color = "bg-[#22C55E]";

  if (percentage < 35) {
    color = "bg-[#EF4444]";
  } else if (percentage < 70) {
    color = "bg-[#F59E0B]";
  }

  return (
    <div className="flex items-center gap-3 min-w-[170px]">

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">

        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <span className="w-12 text-right text-xs font-semibold text-[#374151]">
        {percentage}%
      </span>

    </div>
  );
}