import Card from "@components/ui/Card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { time: "08:00", value: 120 },
  { time: "09:00", value: 180 },
  { time: "10:00", value: 240 },
  { time: "11:00", value: 310 },
  { time: "12:00", value: 390 },
  { time: "13:00", value: 470 },
  { time: "14:00", value: 520 },
  { time: "15:00", value: 610 },
  { time: "16:00", value: 700 },
];

export default function ProductionTrendChart() {
  return (
    <Card title="Production Trend">

      <div className="mb-4 flex items-center justify-between">

        <div>

          <h3 className="text-xl font-semibold text-slate-800">
            Today's Output
          </h3>

          <p className="text-sm text-slate-500">
            Live production progress
          </p>

        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
          Live
        </span>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#F2994A"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}