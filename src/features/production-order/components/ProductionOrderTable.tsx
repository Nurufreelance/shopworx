import ProductionOrderRow from "./ProductionOrderRow";
import { ProductionOrder } from "../types/productionOrder";

interface Props {
  orders: ProductionOrder[];
}

export default function ProductionOrderTable({
  orders,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white">

      <table className="min-w-full border-collapse">

        <thead className="bg-[#F7F9FC]">

          <tr className="border-b border-[#E5E7EB]">

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Status
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Order No
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Part
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Machine
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Operator
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Mould
            </th>

            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Planned Qty
            </th>

            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Produced
            </th>

            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Reject
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Progress
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Start
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              End
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Due Date
            </th>

            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Customer
            </th>

            <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (
            <ProductionOrderRow
              key={order.id}
              order={order}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}