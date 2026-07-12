export default function PlanningGridHeader() {
  return (
    <div
      className="
        sticky
        top-0
        z-30
        grid
        grid-cols-[42px_90px_2fr_100px_2fr_120px_120px_120px]
        items-center
        h-11
        border-b
        border-[#DDE3EA]
        bg-[#F8F9FB]
        px-6
        text-[12px]
        font-semibold
        uppercase
        tracking-wide
        text-[#667085]
      "
    >
      <div></div>

      <div>Plan</div>

      <div>Part</div>

      <div>Colour</div>

      <div>Equipment</div>

      <div className="text-right">
        Planned Qty
      </div>

      <div>Start At</div>

      <div className="text-center">
        Actions
      </div>

    </div>
  );
}