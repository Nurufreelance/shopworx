import Card from "@components/ui/Card/Card";
import MachineProductionCard from "./MachineProductionCard";

const plans = [
  {
    machine: "HT-28-HT-270",
    plan: "100-6976",
    part: "Darvinks Vista Flip Cap",
    produced: 3108,
    accepted: 3108,
    rejected: 0,
  },
  {
    machine: "HT-29-HT-270",
    plan: "100-6982",
    part: "CrystalDeep Bucket",
    produced: 0,
    accepted: 0,
    rejected: 0,
  },
  {
    machine: "HT-30-HT-270",
    plan: "100-6970",
    part: "Crystal Spoon",
    produced: 3816,
    accepted: 3816,
    rejected: 0,
  },
  {
    machine: "HT-31-HT-270",
    plan: "100-6958",
    part: "Baby Bath Set",
    produced: 355,
    accepted: 355,
    rejected: 0,
  },
  {
    machine: "HT-32-FERO-275",
    plan: "100-6983",
    part: "Vista Cap",
    produced: 5955,
    accepted: 5955,
    rejected: 0,
  },
];

export default function ShiftProductionPanel() {
  return (
    <Card title="Shift production">

      <div className="space-y-5">

        {plans.map((item) => (
          <MachineProductionCard
            key={item.machine}
            {...item}
          />
        ))}

      </div>

    </Card>
  );
}