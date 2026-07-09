import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@components/common/Table";

import {
  Star,
  Pencil,
  Copy,
  CircleX,
  Play,
  Pause,
} from "lucide-react";

import StatusDot from "./StatusDot";

interface Plan {
  plan: string;
  part: string;
  color: string;
  equipment: string;
  qty: number;
  start: string;
  status: "running" | "stopped";
}

interface Props {
  plans: Plan[];
}

export default function PlanningTable({ plans }: Props) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell header align="center"></TableCell>

            <TableCell header>Plan</TableCell>

            <TableCell header>Part</TableCell>

            <TableCell header>Colour</TableCell>

            <TableCell header>Equipment</TableCell>

            <TableCell header align="right">
              Planned Qty
            </TableCell>

            <TableCell header>
              Start At
            </TableCell>

            <TableCell header align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.plan}>
              <TableCell align="center">
                <StatusDot status={plan.status} />
              </TableCell>

              <TableCell>
                <span className="cursor-pointer font-medium text-[#3559B7] hover:underline">
                  {plan.plan}
                </span>
              </TableCell>

              <TableCell>{plan.part}</TableCell>

              <TableCell>{plan.color}</TableCell>

              <TableCell>{plan.equipment}</TableCell>

              <TableCell align="right">
                {plan.qty.toLocaleString()}
              </TableCell>

              <TableCell>{plan.start}</TableCell>

              <TableCell align="center">
                <div className="flex items-center justify-center gap-2">
                  <button className="rounded p-1 transition hover:bg-gray-100">
                    <Star size={16} />
                  </button>

                  <button className="rounded p-1 transition hover:bg-gray-100">
                    <Pencil size={16} />
                  </button>

                  <button className="rounded p-1 transition hover:bg-gray-100">
                    <Copy size={16} />
                  </button>

                  {plan.status === "running" ? (
                    <button className="rounded p-1 transition hover:bg-gray-100">
                      <Pause
                        size={16}
                        className="text-orange-500"
                      />
                    </button>
                  ) : (
                    <button className="rounded p-1 transition hover:bg-gray-100">
                      <Play
                        size={16}
                        className="text-green-600"
                      />
                    </button>
                  )}

                  <button className="rounded p-1 transition hover:bg-gray-100">
                    <CircleX
                      size={16}
                      className="text-red-500"
                    />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-x border-b border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
        <span>
          {plans.length} record{plans.length !== 1 ? "s" : ""}
        </span>

        <span>ShopWorx Planning</span>
      </div>
    </>
  );
}