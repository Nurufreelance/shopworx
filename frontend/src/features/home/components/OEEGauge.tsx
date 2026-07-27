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
    <div className="relative h-[270px]">

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="72%"
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
            fill="#F2994A"
            cornerRadius={30}
            background
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">

        <span className="text-xs uppercase tracking-wider text-slate-400">
          OEE
        </span>

        <h1 className="mt-1 text-5xl font-bold text-slate-800">
          {value}%
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Overall Effectiveness
        </p>

      </div>

    </div>
  );
}