import OrderStatusBadge from "./OrderStatusBadge";
import ProgressBar from "./ProgressBar";
import ActionButtons from "./ActionButtons";

import { ProductionOrder } from "../types/productionOrder";

interface Props {
  order: ProductionOrder;
}

export default function ProductionOrderRow({
  order,
}: Props) {
  return (
    <tr className="border-b border-[#ECEFF4] transition hover:bg-[#FAFBFC]">

      <td className="px-5 py-4">
        <OrderStatusBadge status={order.status} />
      </td>

      <td className="px-5 py-4 font-semibold text-[#3559B7]">
        {order.orderNo}
      </td>

      <td className="px-5 py-4">

        <div className="font-semibold text-[#1F2937]">
          {order.partName}
        </div>

        <div className="text-xs text-[#6B7280]">
          {order.partNo}
        </div>

      </td>

      <td className="px-5 py-4 font-medium">
        {order.machine}
      </td>

      <td className="px-5 py-4">
        {order.operator}
      </td>

      <td className="px-5 py-4">
        {order.mould}
      </td>

      <td className="px-5 py-4 text-right font-semibold">
        {order.plannedQty.toLocaleString()}
      </td>

      <td className="px-5 py-4 text-right font-semibold">
        {order.producedQty.toLocaleString()}
      </td>

      <td className="px-5 py-4 text-right text-red-500 font-semibold">
        {order.rejectedQty.toLocaleString()}
      </td>

      <td className="px-5 py-4">
        <ProgressBar
          plannedQty={order.plannedQty}
          producedQty={order.producedQty}
        />
      </td>

      <td className="px-5 py-4 whitespace-nowrap">
        {order.startTime}
      </td>

      <td className="px-5 py-4 whitespace-nowrap">
        {order.endTime}
      </td>

      <td className="px-5 py-4 whitespace-nowrap">
        {order.dueDate}
      </td>

      <td className="px-5 py-4">
        {order.customer}
      </td>

      <td className="px-5 py-4">
        <ActionButtons />
      </td>

    </tr>
  );
}