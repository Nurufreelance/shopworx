import Card from "@components/ui/Card";

import OEEGauge from "./OEEGauge";
import OEEMetric from "./OEEMetric";

export default function OEEChart() {
  return (
    <Card title="Overall Equipment Effectiveness">

      <div className="grid grid-cols-2 gap-8">

        <OEEGauge value={91} />

        <div className="space-y-4">

          <OEEMetric
            title="Availability"
            value="94%"
            color="#16A34A"
          />

          <OEEMetric
            title="Performance"
            value="89%"
            color="#2563EB"
          />

          <OEEMetric
            title="Quality"
            value="98%"
            color="#F97316"
          />

          <OEEMetric
            title="Target"
            value="95%"
            color="#9333EA"
          />

        </div>

      </div>

    </Card>
  );
}