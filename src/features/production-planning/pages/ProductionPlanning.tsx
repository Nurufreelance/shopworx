import ProductionPlanningHeader from "../components/ProductionPlanningHeader";
import PlanningGrid from "../components/PlanningGrid";
import MachineScheduleCard from "../components/MachineScheduleCard";
import { mockProduction } from "../data/mockProduction";

const groupedPlans = mockProduction.reduce<
  Record<string, typeof mockProduction>
>((acc, plan) => {
  if (!acc[plan.machine]) {
    acc[plan.machine] = [];
  }

  acc[plan.machine].push(plan);

  return acc;
}, {});

export default function ProductionPlanning() {
  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">

      <ProductionPlanningHeader />

      <PlanningGrid>

        {Object.entries(groupedPlans).map(([machine, plans]) => (

          <MachineScheduleCard
            key={machine}
            machine={machine}
            plans={plans}
          />

        ))}

      </PlanningGrid>

    </div>
  );
}