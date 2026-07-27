import Card from "@components/ui/Card";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const data = [
    { hour: "08", production: 210 },
    { hour: "09", production: 320 },
    { hour: "10", production: 480 },
    { hour: "11", production: 620 },
    { hour: "12", production: 710 },
    { hour: "13", production: 690 },
    { hour: "14", production: 770 },
    { hour: "15", production: 880 },
];

export default function ProductionByHour() {
    return (
        <Card title="Production By Hour">

            <div className="h-80">

                <ResponsiveContainer>

                    <AreaChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="hour" />

                        <Tooltip />

                        <Area
                            dataKey="production"
                            stroke="#F97316"
                            fill="#FDBA74"
                            strokeWidth={3}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </Card>
    );
}