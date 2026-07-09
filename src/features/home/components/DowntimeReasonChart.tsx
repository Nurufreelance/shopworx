import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    reason: "Machine Communication Error",
    value: 1000,
    percent: 60,
  },
  {
    reason: "No reason",
    value: 650,
    percent: 100,
  },
];

export default function DowntimeReasonChart() {
  return (
    <div>

      <h3 className="text-center text-lg mb-4">
        Downtime by reason
      </h3>

      <div className="h-72">

        <ResponsiveContainer>

          <ComposedChart data={data}>

            <XAxis dataKey="reason" />

            <YAxis />

            <YAxis
              orientation="right"
              domain={[0, 100]}
            />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#47484F"
            />

            <Line
              dataKey="percent"
              stroke="#6FB3FF"
              strokeWidth={3}
            />

          </ComposedChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}