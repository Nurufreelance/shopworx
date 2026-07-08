import PlanningTable from "./PlanningTable";

interface Props {
    machine: string;
    plans: any[];
}

export default function PlanningMachineCard({

    machine,
    plans,

}: Props) {

    return (

        <div className="bg-white rounded-xl shadow-sm p-6">

            <h2 className="text-4xl text-[#3548A5] mb-6">

                {machine}

            </h2>

            <PlanningTable plans={plans} />

        </div>

    );

}