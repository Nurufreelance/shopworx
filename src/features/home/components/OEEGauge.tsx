import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  value: number;
}

export default function OEEGauge({ value }: Props) {
  return (
    <div className="h-72">

      <ResponsiveContainer>

        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={[{ value }]}
          startAngle={180}
          endAngle={0}
        >

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            fill="#F97316"
            cornerRadius={12}
          />

        </RadialBarChart>

      </ResponsiveContainer>

      <div className="-mt-24 text-center">

        <h1 className="text-5xl font-bold">

          {value}%

        </h1>

        <p className="text-gray-500">

          Overall Equipment Effectiveness

        </p>

      </div>

    </div>
  );
}