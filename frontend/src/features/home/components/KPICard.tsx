import { TrendingUp, TrendingDown } from "lucide-react";
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
  blue: "#2F80ED",
  green: "#27AE60",
  orange: "#F2994A",
  purple: "#9B51E0",
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
      bg-white
      border
      border-[#E7EBF0]
      rounded-lg
      px-5
      py-4
      shadow-sm
      hover:shadow-md
      transition-all
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-[13px] font-medium text-slate-500">
            {title}
          </p>

          <div className="mt-2 flex items-end gap-1">

            <h2 className="text-[30px] font-semibold leading-none text-[#22304A]">
              {value}
            </h2>

            <span className="pb-1 text-xs text-slate-400">
              {unit}
            </span>

          </div>

        </div>

        <div
          className="rounded-md p-2"
          style={{
            backgroundColor: `${colors[color]}18`,
          }}
        >
          {positive ? (
            <TrendingUp
              size={18}
              color={colors[color]}
            />
          ) : (
            <TrendingDown
              size={18}
              color={colors[color]}
            />
          )}
        </div>

      </div>

      <div className="mt-3 h-10">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors[color]}
              strokeWidth={2}
              fill={colors[color]}
              fillOpacity={0.12}
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-2 flex items-center justify-between">

        <span
          className={`text-xs font-semibold ${
            positive
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {change}
        </span>

        <span className="text-[11px] text-slate-400">
          vs yesterday
        </span>

      </div>
    </div>
  );
}