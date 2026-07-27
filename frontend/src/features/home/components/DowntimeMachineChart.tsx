import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = Array.from({ length: 24 }, (_, i) => ({
  machine: `M${i + 1}`,
  value: 72 - i * 2.5,
  cumulative: (i / 23) * 100,
}));

export default function DowntimeMachineChart() {
  return (
    <div>

      <h3 className="text-center text-lg mb-4">
        Downtime by machine
      </h3>

      <div className="h-72">

        <ResponsiveContainer>

          <ComposedChart data={data}>

            <XAxis
              dataKey="machine"
              angle={-45}
              interval={0}
              height={70}
              fontSize={9}
            />

            <YAxis />

            <YAxis
              orientation="right"
              domain={[0, 100]}
            />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#44454D"
            />

            <Line
              dataKey="cumulative"
              stroke="#7AB8FF"
              strokeWidth={3}
            />

          </ComposedChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}