import Card from "@components/ui/Card";

const rows = [
  ["Planned", "12,500"],
  ["Produced", "11,245"],
  ["Rejected", "245"],
  ["Downtime", "42 min"],
  ["Operators", "12"],
  ["Efficiency", "89%"],
];

export default function ShiftSummary() {
  return (
    <Card title="Shift Summary">

      <div className="space-y-4">

        {rows.map(([name, value]) => (

          <div
            key={name}
            className="flex justify-between border-b pb-3"
          >

            <span className="text-gray-500">

              {name}

            </span>

            <strong>

              {value}

            </strong>

          </div>

        ))}

      </div>

    </Card>
  );
}