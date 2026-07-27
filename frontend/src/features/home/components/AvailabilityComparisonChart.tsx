import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = Array.from({ length: 36 }, (_, i) => ({
  name: `HT-${i + 1}`,
  grey: 80 + Math.random() * 20,
  blue: 8 + Math.random() * 20,
}));

export default function AvailabilityComparisonChart() {
  return (
    <div>

      <h3 className="text-center text-lg mb-4">
        Availability comparison
      </h3>

      <div className="h-72">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="name"
              angle={-45}
              interval={0}
              height={80}
              fontSize={9}
            />

            <Tooltip />

            <Bar
              dataKey="grey"
              fill="#B5B7BE"
            />

            <Bar
              dataKey="blue"
              fill="#3247A5"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}