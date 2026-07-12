import ProductionLogHeader from "../components/ProductionLogHeader";
import ProductionLogToolbar from "../components/ProductionLogToolbar";
import ProductionLogTable from "../components/ProductionLogTable";

import { mockProductionLog } from "../data/mockProductionLog";

export default function ProductionLog() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] p-6">

      <ProductionLogHeader
        total={mockProductionLog.length}
      />

      <ProductionLogToolbar />

      <ProductionLogTable
        logs={mockProductionLog}
      />

    </main>
  );
}