import Card from "@components/ui/Card";

export default function DowntimeSummary() {

    return (

        <Card title="Downtime Summary">

            <div className="space-y-5">

                <div className="flex justify-between">

                    <span>Total Downtime</span>

                    <strong>42 min</strong>

                </div>

                <div className="flex justify-between">

                    <span>Mechanical</span>

                    <strong>18 min</strong>

                </div>

                <div className="flex justify-between">

                    <span>Electrical</span>

                    <strong>11 min</strong>

                </div>

                <div className="flex justify-between">

                    <span>Material</span>

                    <strong>9 min</strong>

                </div>

                <div className="flex justify-between">

                    <span>Others</span>

                    <strong>4 min</strong>

                </div>

            </div>

        </Card>

    );

}