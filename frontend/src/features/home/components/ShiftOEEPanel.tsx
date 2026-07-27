import Card from "@components/ui/Card/Card";

import OEEGauge from "./OEEGauge";
import AvailabilityComparisonChart from "./AvailabilityComparisonChart";
import DowntimeMachineChart from "./DowntimeMachineChart";
import DowntimeReasonChart from "./DowntimeReasonChart";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ShiftOEEPanel() {
  return (
    <Card title="Shift OEE" className="h-full">

      <div className="space-y-8">

        <OEEGauge value={9.45} />

        <div className="flex items-center justify-between">

          <ChevronLeft size={18} className="text-slate-400" />

          <div className="text-center flex-1">

            <div className="flex justify-around">

              <div>

                <h2 className="text-3xl text-[#3548A3] font-semibold">
                  12.06%
                </h2>

                <p className="text-sm text-slate-500">
                  Availability
                </p>

              </div>

              <div>

                <h2 className="text-3xl text-slate-700 font-semibold">
                  78.38%
                </h2>

                <p className="text-sm text-slate-500">
                  Performance
                </p>

              </div>

              <div>

                <h2 className="text-3xl text-slate-700 font-semibold">
                  1
                </h2>

                <p className="text-sm text-slate-500">
                  Quality
                </p>

              </div>

            </div>

          </div>

          <ChevronRight size={18} className="text-slate-400" />

        </div>

        <AvailabilityComparisonChart />

        <DowntimeMachineChart />

        <DowntimeReasonChart />

      </div>

    </Card>
  );
}