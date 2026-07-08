import Card from "@components/ui/Card";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
} from "recharts";

const data = [

    { name: "Mon", value: 900 },

    { name: "Tue", value: 1200 },

    { name: "Wed", value: 980 },

    { name: "Thu", value: 1600 },

    { name: "Fri", value: 1350 },

];

export default function ProductionOverviewChart() {

    return (

        <Card title="Production Overview">

            <div className="h-80">

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <XAxis dataKey="name" />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill="#F97316"
                            radius={[6,6,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}