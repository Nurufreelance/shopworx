import PlanningBar from "./PlanningBar";
import PlanningCell from "./PlanningCell";
import { ProductionPlan } from "../types/production";

interface Props {
  plan: ProductionPlan;
}

export default function PlanningTimelineRow({
  plan,
}: Props) {
  /**
   * Temporary values.
   * Later Laravel will send these.
   */
  const startHour = 6;
  const duration = 5;

  return (
    <div
      className="relative grid bg-white"
      style={{
        gridTemplateColumns:
          "repeat(24, minmax(64px,1fr))",
      }}
    >
      {Array.from({ length: 24 }).map((_, index) => (
        <PlanningCell
          key={index}
          hour={index}
        />
      ))}

      <PlanningBar
        start={startHour}
        duration={duration}
        label={plan.part}
        status={plan.status}
      />
    </div>
  );
}