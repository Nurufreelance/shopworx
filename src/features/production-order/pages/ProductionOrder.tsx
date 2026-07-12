import ProductionOrderHeader from "../components/ProductionOrderHeader";
import ProductionOrderToolbar from "../components/ProductionOrderToolbar";
import ProductionOrderTable from "../components/ProductionOrderTable";

import { mockOrders } from "../data/mockOrders";

export default function ProductionOrder() {
  return (
    <div className="flex h-full flex-col bg-[#F5F7FA]">

      <ProductionOrderHeader />

      <ProductionOrderToolbar />

      <div className="flex-1 overflow-auto p-6">

        <ProductionOrderTable
          orders={mockOrders}
        />

      </div>

    </div>
  );
}