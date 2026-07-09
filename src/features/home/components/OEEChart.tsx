import Card from "@components/ui/Card";

import OEEGauge from "./OEEGauge";
import OEEMetric from "./OEEMetric";

export default function OEEChart() {
  return (
    <Card title="Overall Equipment Effectiveness">
      <div className="grid grid-cols-12 gap-8 items-center">

        <div className="col-span-6">
          <OEEGauge value={91} />
        </div>

        <div className="col-span-6 space-y-3">

          <OEEMetric
            title="Availability"
            value="94.0%"
            color="#2EBD59"
          />

          <OEEMetric
            title="Performance"
            value="89.3%"
            color="#2F80ED"
          />

          <OEEMetric
            title="Quality"
            value="98.2%"
            color="#F2994A"
          />

          <OEEMetric
            title="Target"
            value="95.0%"
            color="#9B51E0"
          />

        </div>

      </div>
    </Card>
  );
}