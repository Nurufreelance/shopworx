import Card from "@components/ui/Card";

export default function AvailabilityCard() {
  return (
    <Card title="Availability">

      <div className="space-y-6">

        <div className="text-center">

          <h1 className="text-5xl font-bold text-green-600">

            94%

          </h1>

          <p className="text-gray-500">

            Machine Availability

          </p>

        </div>

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>Running</span>

            <strong>15</strong>

          </div>

          <div className="flex justify-between">

            <span>Idle</span>

            <strong>2</strong>

          </div>

          <div className="flex justify-between">

            <span>Maintenance</span>

            <strong>1</strong>

          </div>

          <div className="flex justify-between">

            <span>Offline</span>

            <strong>0</strong>

          </div>

        </div>

      </div>

    </Card>
  );
}