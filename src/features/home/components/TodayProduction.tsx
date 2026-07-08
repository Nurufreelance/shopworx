import Card from "@components/ui/Card";

export default function TodayProduction() {
  return (
    <Card title="Today's Production">

      <div className="space-y-5">

        <div>

          <h1 className="text-5xl font-bold">

            10,520

          </h1>

          <p className="text-gray-500">

            Total Units Produced

          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-lg bg-green-50 p-4">

            <p className="text-sm text-gray-500">

              Good Units

            </p>

            <h2 className="text-2xl font-bold text-green-600">

              10,320

            </h2>

          </div>

          <div className="rounded-lg bg-red-50 p-4">

            <p className="text-sm text-gray-500">

              Rejects

            </p>

            <h2 className="text-2xl font-bold text-red-500">

              200

            </h2>

          </div>

        </div>

      </div>

    </Card>
  );
}