const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

export default function PlanningTimeScale() {
  return (
    <div
      className="grid border-b border-[#E5E7EB] bg-[#F8FAFC]"
      style={{
        gridTemplateColumns:
          "repeat(24, minmax(64px,1fr))",
      }}
    >
      {HOURS.map((hour) => (
        <div
          key={hour}
          className="
            h-10
            flex
            items-center
            justify-center
            border-r
            border-[#E5E7EB]
            text-[11px]
            font-semibold
            text-[#64748B]
          "
        >
          {hour}:00
        </div>
      ))}
    </div>
  );
}