import Card from "@components/ui/Card";

const errors = [
  {
    name: "Emergency Stop",
    total: 8,
    color: "bg-red-500",
  },
  {
    name: "Material Jam",
    total: 5,
    color: "bg-orange-500",
  },
  {
    name: "Sensor Fault",
    total: 3,
    color: "bg-yellow-500",
  },
  {
    name: "Low Air Pressure",
    total: 2,
    color: "bg-blue-500",
  },
  {
    name: "Motor Overload",
    total: 1,
    color: "bg-purple-500",
  },
];

export default function MachineErrors() {
  return (
    <Card title="Machine Errors">

      <div className="space-y-5">

        {errors.map((error) => (

          <div key={error.name}>

            <div className="flex justify-between mb-2">

              <span>

                {error.name}

              </span>

              <strong>

                {error.total}

              </strong>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">

              <div
                className={`${error.color} h-2 rounded-full`}
                style={{
                  width: `${error.total * 10}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}