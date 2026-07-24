import { PageLayout } from "@components/layout/PageLayout";
import OEEGauge from "@components/dashboard/charts/OEEGauge";
import ProductionBarChart from "@components/dashboard/charts/ProductionBarChart";
import DowntimeChart from "@components/dashboard/charts/DowntimeChart";
import OEEKPIs from "@components/dashboard/charts/OEEKPIs";
import AvailabilityChart from "@components/dashboard/charts/AvailabilityChart";
import MachineCard from "@components/dashboard/cards/MachineCard";

// Mock data
const mockMachines = Array.from({ length: 24 }, (_, i) => ({
  id: `HT${28 + i}`,
  status: ["Running", "Setup", "Offline", "Running", "Running"][
    i % 5
  ] as "Running" | "Setup" | "Offline",

  operator: ["John D", "Sarah", "Mike", "Emma", "James"][i % 5],

  part: `Widget ${String.fromCharCode(65 + (i % 5))}`,

  mould: `M-${100 + i}`,

  cycle: 24 + (i % 6),

  shift: i < 12 ? "A" : "B",

  target: 160,

  produced: 130 + (i % 20),

  rejected: i % 5,

  availability: 90 + (i % 8),

  performance: 80 + (i % 12),

  quality: 98,

  oee: 75 + (i % 18),
}));

export default function Home() {
  return (
    <PageLayout
  title="Shop Floor Dashboard"
  subtitle="Today's Production"
  equipment="All Machines"
>

      {/* KPI Cards */}

      <div className="mb-6">
        <OEEKPIs />
      </div>

      {/* Top Charts */}

      <div className="grid grid-cols-12 gap-5 mb-6">

        <div className="col-span-12 xl:col-span-3">
          <OEEGauge
            value={38.42}
            title="Shift OEE"
          />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <ProductionBarChart />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <DowntimeChart />
        </div>

      </div>

      {/* Availability */}

      <div className="mb-6">
        <AvailabilityChart />
      </div>

      {/* Machine Dashboard */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">

        {mockMachines.map((machine) => (

          <MachineCard
            key={machine.id}
            machine={machine}
          />

        ))}

      </div>

    </PageLayout>
  );
}