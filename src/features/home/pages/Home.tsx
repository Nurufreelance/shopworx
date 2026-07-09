import KPISection from "../components/KPISection";

import OEEChart from "../components/OEEChart";
import ShiftSummary from "../components/ShiftSummary";

import ProductionOverviewChart from "../components/ProductionOverviewChart";
import ProductionTrendChart from "../components/ProductionTrendChart";

import MachineStatus from "../components/MachineStatus";
import MachineErrors from "../components/MachineErrors";

import QualitySummary from "../components/QualitySummary";
import AvailabilityCard from "../components/AvailabilityCard";

import ProductionByHour from "../components/ProductionByHour";
import DowntimeTrend from "../components/DowntimeTrend";

import UtilizationCard from "../components/UtilizationCard";
import DowntimeSummary from "../components/DowntimeSummary";

export default function Home() {
  return (
    <div className="space-y-7">

      {/* KPI */}
      <KPISection />

      {/* OEE + Shift */}
      <section className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-8">
          <OEEChart />
        </div>

        <div className="col-span-4">
          <ShiftSummary />
        </div>

      </section>

      {/* Production */}
      <section className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-8">
          <ProductionOverviewChart />
        </div>

        <div className="col-span-4">
          <ProductionTrendChart />
        </div>

      </section>

      {/* Machines */}
      <section className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-8">
          <MachineStatus />
        </div>

        <div className="col-span-4">
          <MachineErrors />
        </div>

      </section>

      {/* Quality */}
      <section className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-6">
          <QualitySummary />
        </div>

        <div className="col-span-6">
          <AvailabilityCard />
        </div>

      </section>

      {/* Hourly */}
      <section className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-8">
          <ProductionByHour />
        </div>

        <div className="col-span-4">
          <DowntimeTrend />
        </div>

      </section>

      {/* Utilization */}
      <section className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-8">
          <UtilizationCard />
        </div>

        <div className="col-span-4">
          <DowntimeSummary />
        </div>

      </section>

    </div>
  );
}