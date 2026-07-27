import Card from "@components/ui/Card";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const data = [
    { name: "Morning", value: 48 },
    { name: "Afternoon", value: 34 },
    { name: "Night", value: 18 },
];

const COLORS = [
    "#F97316",
    "#FB923C",
    "#FDBA74",
];

export default function ProductionByShift() {
    return (
        <Card title="Production By Shift">

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={60}
                            outerRadius={100}
                        >

                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </Card>
    );
}