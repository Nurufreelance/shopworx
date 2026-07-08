import Card from "@components/ui/Card";

const machines = [
  {
    machine: "Filler 01",
    status: "Running",
    color: "bg-green-500",
    operator: "John",
    speed: "245 bpm",
  },
  {
    machine: "Capper 01",
    status: "Idle",
    color: "bg-yellow-400",
    operator: "Mary",
    speed: "--",
  },
  {
    machine: "Labeller",
    status: "Maintenance",
    color: "bg-orange-500",
    operator: "David",
    speed: "--",
  },
  {
    machine: "Packer",
    status: "Alarm",
    color: "bg-red-500",
    operator: "Daniel",
    speed: "Stopped",
  },
  {
    machine: "Palletizer",
    status: "Running",
    color: "bg-green-500",
    operator: "Peter",
    speed: "310 bpm",
  },
];

export default function MachineStatus() {
  return (
    <Card title="Machine Status">

      <div className="space-y-3">

        {machines.map((machine) => (

          <div
            key={machine.machine}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition"
          >

            <div className="flex items-center gap-4">

              <div
                className={`w-3 h-3 rounded-full ${machine.color}`}
              />

              <div>

                <h3 className="font-semibold">

                  {machine.machine}

                </h3>

                <p className="text-xs text-gray-500">

                  Operator: {machine.operator}

                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="font-semibold">

                {machine.status}

              </p>

              <p className="text-xs text-gray-500">

                {machine.speed}

              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}