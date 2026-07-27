import Card from "@components/ui/Card";

export default function ProductionTarget() {
  const percentage = 84;

  return (
    <Card title="Production Target">
      <div className="space-y-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#F97316]">
            {percentage}%
          </h2>

          <p className="text-gray-500 mt-2">
            Daily Target Completion
          </p>

        </div>

        <div>

          <div className="w-full h-3 rounded-full bg-gray-200">

            <div
              className="h-3 rounded-full bg-[#F97316]"
              style={{ width: `${percentage}%` }}
            />

          </div>

        </div>

        <div className="flex justify-between text-sm">

          <div>
            <p className="text-gray-500">
              Planned
            </p>

            <strong>12,500</strong>
          </div>

          <div className="text-right">
            <p className="text-gray-500">
              Produced
            </p>

            <strong>10,520</strong>
          </div>

        </div>

      </div>
    </Card>
  );
}