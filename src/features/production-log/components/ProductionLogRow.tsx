import { ProductionLog } from "../types/production-log.types";

import ProductionStatusBadge from "./ProductionStatusBadge";
import ScrapBadge from "./ScrapBadge";
import ActionButtons from "./ActionButtons";

interface Props {
  log: ProductionLog;
}

export default function ProductionLogRow({
  log,
}: Props) {
  return (
    <tr className="border-b border-[#ECEFF4] hover:bg-[#FAFBFC] transition-colors">

      {/* Machine */}

      <td className="px-4 py-3 whitespace-nowrap text-[13px] font-medium text-[#2F3640]">
        {log.machine}
      </td>

      {/* Part */}

      <td className="px-4 py-3 text-[13px] text-[#2F3640]">
        {log.part}
      </td>

      {/* Colour */}

      <td className="px-4 py-3 text-[13px] text-[#5C6470]">
        {log.colour}
      </td>

      {/* Production Status */}

      <td className="px-4 py-3">
        <ProductionStatusBadge
          status={log.productionStatus}
        />
      </td>

      {/* Production Mode */}

      <td className="px-4 py-3 text-[13px] text-[#2F3640]">
        {log.productionMode}
      </td>

      {/* Produced */}

      <td className="px-4 py-3 text-right text-[13px] font-medium">
        {log.producedQty.toLocaleString()}
      </td>

      {/* Accepted */}

      <td className="px-4 py-3 text-right text-[13px]">
        {log.acceptedQty.toLocaleString()}
      </td>

      {/* Rejected */}

      <td className="px-4 py-3 text-right text-[13px] text-red-600">
        {log.rejectedQty.toLocaleString()}
      </td>

      {/* Scrap */}

      <td className="px-4 py-3 text-center">
        <ScrapBadge scrap={log.scrapQty} />
      </td>

      {/* Running */}

      <td className="px-4 py-3">

        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            log.runningStatus === "Running"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          <span
            className={`mr-2 h-2 w-2 rounded-full ${
              log.runningStatus === "Running"
                ? "bg-green-600"
                : "bg-red-500"
            }`}
          />

          {log.runningStatus}

        </span>

      </td>

      {/* Start */}

      <td className="px-4 py-3 whitespace-nowrap text-[13px]">
        {log.startTime}
      </td>

      {/* End */}

      <td className="px-4 py-3 whitespace-nowrap text-[13px]">
        {log.endTime}
      </td>

      {/* Actions */}

      <td className="px-4 py-3">
        <ActionButtons />
      </td>

    </tr>
  );
}