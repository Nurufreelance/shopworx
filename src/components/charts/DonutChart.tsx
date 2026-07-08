import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  value: number;
  color?: string;
}

export default function DonutChart({
  value,
  color = "#F97316",
}: Props) {
  const data = [
    {
      name: "Completed",
      value,
    },
    {
      name: "Remaining",
      value: 100 - value,
    },
  ];

  return (
    <div className="relative h-60 w-full">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#E5E7EB" />
          </Pie>

        </PieChart>

      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-4xl font-bold">

            {value}%

          </h2>

          <p className="text-gray-500">

            OEE

          </p>

        </div>

      </div>

    </div>
  );
}