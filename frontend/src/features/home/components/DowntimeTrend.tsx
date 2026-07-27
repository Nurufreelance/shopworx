import Card from "@components/ui/Card";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
} from "recharts";

const data = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 22 },
    { day: "Wed", value: 30 },
    { day: "Thu", value: 15 },
    { day: "Fri", value: 10 },
];

export default function DowntimeTrend() {

    return (

        <Card title="Downtime Trend">

            <div className="h-80">

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <XAxis dataKey="day" />

                        <Tooltip />

                        <Line
                            dataKey="value"
                            stroke="#EF4444"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}