import { Star, Pencil, Copy, CircleX } from "lucide-react";
import StatusDot from "./StatusDot";

interface Props {
    plans: any[];
}

export default function PlanningTable({ plans }: Props) {

    return (

        <table className="w-full">

            <thead>

                <tr className="text-gray-500 text-sm">

                    <th></th>
                    <th>Plan</th>
                    <th>Part</th>
                    <th>Color</th>
                    <th>Equipment</th>
                    <th>Planned qty</th>
                    <th>Start at</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {plans.map((plan) => (

                    <tr
                        key={plan.plan}
                        className="border-t h-16"
                    >

                        <td>

                            <StatusDot status={plan.status} />

                        </td>

                        <td className="text-blue-700 underline">

                            {plan.plan}

                        </td>

                        <td>{plan.part}</td>

                        <td>{plan.color}</td>

                        <td>{plan.equipment}</td>

                        <td>{plan.qty.toLocaleString()}</td>

                        <td>{plan.start}</td>

                        <td>

                            <div className="flex gap-3">

                                <Star size={18} />

                                <Pencil size={18} />

                                <Copy size={18} />

                                <CircleX
                                    size={18}
                                    className="text-red-500"
                                />

                            </div>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}