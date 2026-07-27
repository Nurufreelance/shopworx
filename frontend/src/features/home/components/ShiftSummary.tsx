import Card from "@components/ui/Card";

const rows = [
  {
    label: "Planned",
    value: "12,500",
  },
  {
    label: "Produced",
    value: "11,245",
  },
  {
    label: "Rejected",
    value: "245",
  },
  {
    label: "Downtime",
    value: "42 min",
  },
  {
    label: "Operators",
    value: "12",
  },
  {
    label: "Efficiency",
    value: "89%",
  },
];

export default function ShiftSummary() {
  return (
    <Card title="Current Shift">

      {/* Shift Header */}

      <div className="mb-5 rounded-lg border border-orange-100 bg-orange-50 p-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Active Shift
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              Shift A
            </h2>

          </div>

          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            Running
          </span>

        </div>

        <p className="mt-3 text-sm text-slate-500">
          06:00 AM – 02:00 PM
        </p>

      </div>

      {/* Summary Rows */}

      <div className="space-y-3">

        {rows.map((row) => (

          <div
            key={row.label}
            className="flex items-center justify-between border-b border-slate-100 pb-3"
          >

            <span className="text-sm text-slate-500">
              {row.label}
            </span>

            <span className="font-semibold text-slate-800">
              {row.value}
            </span>

          </div>

        ))}

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-xs text-slate-500">

          <span>Shift Progress</span>

          <span>71%</span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-orange-500"
            style={{ width: "71%" }}
          />

        </div>

      </div>

    </Card>
  );
}