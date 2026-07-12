import ScheduleRow from "./ScheduleRow";
import { ProductionPlan } from "../types/production";

interface Props {
  machine: string;
  plans: ProductionPlan[];
}

export default function MachineScheduleCard({
  machine,
  plans,
}: Props) {
  return (
    <>
      {/* Machine Header */}

      <div className="sticky bg-[#F8FAFC] border-y border-[#E5E7EB] px-6 py-2">

        <div className="flex items-center gap-3">

          <div className="w-2 h-2 rounded-full bg-[#3559B7]" />

          <h2 className="text-sm font-semibold text-[#344054]">
            {machine}
          </h2>

          <span className="text-xs text-[#98A2B3]">
            ({plans.length} Plans)
          </span>

        </div>

      </div>

      {/* Rows */}

      {plans.map((plan) => (
        <ScheduleRow
          key={plan.id}
          machine={machine}
          plan={plan}
        />
      ))}
    </>
  );
}