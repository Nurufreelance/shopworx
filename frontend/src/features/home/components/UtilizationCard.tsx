import Card from "@components/ui/Card";

export default function UtilizationCard() {

    return (

        <Card title="Machine Utilization">

            <div className="space-y-5">

                {[
                    ["Line 1", 91],
                    ["Line 2", 84],
                    ["Line 3", 96],
                    ["Line 4", 78],
                    ["Packaging", 88],
                ].map(([line, value]) => (

                    <div key={String(line)}>

                        <div className="flex justify-between mb-2">

                            <span>{line}</span>

                            <strong>{value}%</strong>

                        </div>

                        <div className="h-3 rounded-full bg-gray-200">

                            <div
                                className="h-3 rounded-full bg-[#F97316]"
                                style={{
                                    width: `${value}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </Card>

    );

}