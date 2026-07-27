import {
  User,
  ChevronDown,
  RotateCw,
} from "lucide-react";

interface Props {
  machine: string;
  plan: string;
  part: string;
  produced: number;
  accepted: number;
  rejected: number;
}

export default function MachineProductionCard({
  machine,
  plan,
  part,
  produced,
  accepted,
  rejected,
}: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">

      <div className="px-4 py-3 bg-white">

        <h2 className="text-xl font-semibold text-[#3548A3]">
          {machine}
        </h2>

      </div>

      <div className="bg-slate-100 px-4 py-2 flex justify-between">

        <User size={15} />

        <ChevronDown size={15} />

      </div>

      <table className="w-full text-sm">

        <thead>

          <tr className="text-slate-500">

            <th className="text-left px-3 py-2">
              Plan
            </th>

            <th className="text-left">
              Part
            </th>

            <th>
              Produced
            </th>

            <th>
              Accepted
            </th>

            <th>
              Rejected
            </th>

            <th />

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="px-3 py-3">
              {plan}
            </td>

            <td>{part}</td>

            <td>{produced}</td>

            <td className="text-green-600">
              {accepted}
            </td>

            <td className="text-red-500">
              {rejected}
            </td>

            <td>

              <RotateCw
                size={16}
                className="text-[#3548A3]"
              />

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}