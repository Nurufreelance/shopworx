import Card from "@components/ui/Card";

export default function QualitySummary() {

    return (

        <Card title="Quality Summary">

            <div className="space-y-6">

                <div className="text-center">

                    <h1 className="text-5xl font-bold text-green-600">

                        98%

                    </h1>

                    <p className="text-gray-500">

                        First Pass Yield

                    </p>

                </div>

                <div className="space-y-4">

                    <div className="flex justify-between">

                        <span>Passed</span>

                        <strong>10,320</strong>

                    </div>

                    <div className="flex justify-between">

                        <span>Rejected</span>

                        <strong>200</strong>

                    </div>

                    <div className="flex justify-between">

                        <span>Reworked</span>

                        <strong>45</strong>

                    </div>

                </div>

            </div>

        </Card>

    );

}