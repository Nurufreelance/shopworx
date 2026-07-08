import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart as Chart,
} from "recharts";

interface Props {
  data: any[];
}

export default function BarChart({
  data,
}: Props) {
  return (
    <div className="h-72">

      <ResponsiveContainer>

        <Chart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="production"
            fill="#F97316"
            radius={[4,4,0,0]}
          />

        </Chart>

      </ResponsiveContainer>

    </div>
  );
}