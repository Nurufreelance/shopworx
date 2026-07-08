import KPISection from "../components/KPISection";
import OEEChart from "../components/OEEChart";
import ShiftSummary from "../components/ShiftSummary";

import ProductionOverviewChart from "../components/ProductionOverviewChart";
import ProductionTrendChart from "../components/ProductionTrendChart";

import ProductionTarget from "../components/ProductionTarget";
import TodayProduction from "../components/TodayProduction";
import AvailabilityCard from "../components/AvailabilityCard";

import MachineStatus from "../components/MachineStatus";
import MachineErrors from "../components/MachineErrors";

import ProductionByHour from "../components/ProductionByHour";
import ProductionByShift from "../components/ProductionByShift";

import DowntimeSummary from "../components/DowntimeSummary";
import DowntimeTrend from "../components/DowntimeTrend";
import QualitySummary from "../components/QualitySummary";
import UtilizationCard from "../components/UtilizationCard";

export default function Home() {
  return (
    <div className="max-w-[1700px] mx-auto p-6 space-y-6">

      {/* KPI Cards */}
      <KPISection />

      {/* OEE + Shift Summary */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <OEEChart />
        </div>

        <div className="col-span-4">
          <ShiftSummary />
        </div>
      </div>

      {/* Production Metrics */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <ProductionTarget />
        </div>

        <div className="col-span-4">
          <TodayProduction />
        </div>

        <div className="col-span-4">
          <AvailabilityCard />
        </div>
      </div>

      {/* Machine Status */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <MachineStatus />
        </div>

        <div className="col-span-5">
          <MachineErrors />
        </div>
      </div>

      {/* Production Charts */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <ProductionOverviewChart />
        </div>

        <div className="col-span-6">
          <ProductionTrendChart />
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <ProductionByHour />
        </div>

        <div className="col-span-6">
          <ProductionByShift />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <DowntimeSummary />
        </div>

        <div className="col-span-4">
          <DowntimeTrend />
        </div>

        <div className="col-span-4">
          <QualitySummary />
        </div>
      </div>

      {/* Utilization */}
      <div className="pb-8">
        <UtilizationCard />
      </div>

    </div>
  );
}