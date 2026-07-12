import { ProductionLog } from "../types/production-log.types";
import ProductionLogRow from "./ProductionLogRow";

interface Props {
  logs: ProductionLog[];
}

export default function ProductionLogTable({
  logs,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#D9DEE7] bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead className="bg-[#F7F9FC]">

            <tr className="border-b border-[#D9DEE7]">

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Machine
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Part
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Colour
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Status
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Mode
              </th>

              <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Produced
              </th>

              <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Accepted
              </th>

              <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Rejected
              </th>

              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Scrap
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Running
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Start
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                End
              </th>

              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.map((log) => (
              <ProductionLogRow
                key={log.id}
                log={log}
              />
            ))}

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between border-t border-[#ECEFF4] bg-[#FAFBFC] px-6 py-4">

        <span className="text-sm text-[#6B7280]">
          Showing{" "}
          <span className="font-semibold text-[#2F3640]">
            {logs.length}
          </span>{" "}
          production records
        </span>

        <span className="text-sm font-medium text-[#3559B7]">
          ShopWorx Production Log
        </span>

      </div>

    </div>
  );
}