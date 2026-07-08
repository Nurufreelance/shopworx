import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface Props {
  title: string;
  value: string;
  unit: string;
  change: string;
  positive: boolean;
  color: "blue" | "green" | "orange" | "purple";
}

const chartData = [
  { value: 12 },
  { value: 15 },
  { value: 14 },
  { value: 18 },
  { value: 20 },
  { value: 17 },
  { value: 24 },
];

const colors = {
  blue: "#3B82F6",
  green: "#10B981",
  orange: "#F97316",
  purple: "#8B5CF6",
};

export default function KPICard({
  title,
  value,
  unit,
  change,
  positive,
  color,
}: Props) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-5
      shadow-sm
      transition-all
      duration-200
      hover:shadow-md
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <div className="mt-2 flex items-end gap-2">

            <h2 className="text-3xl font-bold text-slate-800">
              {value}
            </h2>

            <span className="pb-1 text-sm text-gray-500">
              {unit}
            </span>

          </div>

        </div>

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${colors[color]}20`,
          }}
        >
          {positive ? (
            <TrendingUp
              size={24}
              color={colors[color]}
            />
          ) : (
            <TrendingDown
              size={24}
              color={colors[color]}
            />
          )}
        </div>

      </div>

      <div className="mt-5 h-14">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors[color]}
              fill={colors[color]}
              fillOpacity={0.15}
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span
          className={`text-sm font-semibold ${
            positive
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-gray-400">
          vs yesterday
        </span>

      </div>

    </div>
  );
}