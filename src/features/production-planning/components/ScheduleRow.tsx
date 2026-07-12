import StatusDot from "./StatusDot";
import ActionButtons from "./ActionButtons";
import { ProductionPlan } from "../types/production";

interface Props {
  machine: string;
  plan: ProductionPlan;
}

export default function ScheduleRow({
  machine,
  plan,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-[40px_90px_2fr_90px_2fr_110px_100px_90px]
        items-center
        border-b
        border-[#EEF2F6]
        px-6
        py-3
        text-[13px]
        hover:bg-[#FAFBFD]
      "
    >
      {/* Status */}

      <div className="flex justify-center">

        <StatusDot status={plan.status} />

      </div>

      {/* Plan */}

      <div>

        <button
          className="
            text-[#2F6BFF]
            font-semibold
            hover:underline
          "
        >
          {plan.plan}
        </button>

        <div className="mt-1 text-[11px] text-[#98A2B3]">
          {machine}
        </div>

      </div>

      {/* Part */}

      <div className="font-medium text-[#344054]">

        {plan.part}

      </div>

      {/* Colour */}

      <div className="text-[#475467]">

        {plan.color}

      </div>

      {/* Equipment */}

      <div className="text-[#344054]">

        {plan.equipment}

      </div>

      {/* Qty */}

      <div className="text-right font-semibold text-[#344054]">

        {plan.plannedQty.toLocaleString()}

      </div>

      {/* Start */}

      <div className="text-[#475467]">

        {plan.startAt}

      </div>

      {/* Actions */}

      <div className="flex justify-center">

        <ActionButtons />

      </div>

    </div>
  );
}