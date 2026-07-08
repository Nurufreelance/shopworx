import PlanningHeader from "../components/PlanningHeader";
import PlanningToolbar from "../components/PlanningToolbar";
import PlanningMachineCard from "../components/PlanningMachineCard";
import { planningData } from "../data/planningData";

export default function ProductionPlanning() {

    return (

        <div className="max-w-[1700px] mx-auto p-6 space-y-6">

            <PlanningHeader />

            <PlanningToolbar />

            {planningData.map((machine) => (

                <PlanningMachineCard
                    key={machine.machine}
                    machine={machine.machine}
                    plans={machine.plans}
                />

            ))}

        </div>

    );

}