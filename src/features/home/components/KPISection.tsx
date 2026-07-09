import KPICard from "./KPICard";

export default function KPISection() {
  return (
    <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">

      <KPICard
        title="Today's Production"
        value="12,486"
        unit="Units"
        change="+8.2%"
        positive
        color="blue"
      />

      <KPICard
        title="Overall OEE"
        value="86.4"
        unit="%"
        change="+2.4%"
        positive
        color="green"
      />

      <KPICard
        title="Machine Availability"
        value="94.2"
        unit="%"
        change="-0.8%"
        positive={false}
        color="orange"
      />

      <KPICard
        title="Quality Rate"
        value="99.1"
        unit="%"
        change="+0.3%"
        positive
        color="purple"
      />

    </div>
  );
}