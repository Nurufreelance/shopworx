import Card from "@components/ui/Card";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
} from "recharts";

const data = [

    { hour: "08", value: 120 },

    { hour: "10", value: 240 },

    { hour: "12", value: 360 },

    { hour: "14", value: 480 },

    { hour: "16", value: 560 },

];

export default function ProductionTrendChart() {

    return (

        <Card title="Production Trend">

            <div className="h-80">

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <XAxis dataKey="hour" />

                        <Tooltip />

                        <Line
                            dataKey="value"
                            stroke="#F97316"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}