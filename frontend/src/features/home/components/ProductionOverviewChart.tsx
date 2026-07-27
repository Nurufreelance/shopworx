import Card from "@components/ui/Card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", actual: 920, target: 1000 },
  { day: "Tue", actual: 1180, target: 1200 },
  { day: "Wed", actual: 980, target: 1000 },
  { day: "Thu", actual: 1580, target: 1600 },
  { day: "Fri", actual: 1340, target: 1400 },
  { day: "Sat", actual: 1260, target: 1300 },
];

export default function ProductionOverviewChart() {
  return (
    <Card title="Production Overview">

      <div className="mb-4 flex items-center justify-between">

        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            7,260 Units
          </h3>

          <p className="text-sm text-slate-500">
            Total production this week
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          +6.8%
        </span>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data} barGap={5}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="actual"
              name="Actual"
              fill="#F2994A"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="target"
              name="Target"
              fill="#DDE4EE"
              radius={[5, 5, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}