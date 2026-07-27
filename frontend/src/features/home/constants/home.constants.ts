import { Machine, MachineError } from "../types/home.types";

export const machines: Machine[] = [
  {
    id:1,
    machine:"Machine 01",
    operator:"John",
    product:"Bottle Cap",
    status:"Running",
    shift:"A",
    efficiency:92,
    speed:118,
    updated:"1 min ago"
  },
  {
    id:2,
    machine:"Machine 02",
    operator:"David",
    product:"Bottle",
    status:"Idle",
    shift:"A",
    efficiency:74,
    speed:0,
    updated:"3 mins ago"
  },
  {
    id:3,
    machine:"Machine 03",
    operator:"Peter",
    product:"Label",
    status:"Maintenance",
    shift:"B",
    efficiency:0,
    speed:0,
    updated:"8 mins ago"
  }
];

export const machineErrors: MachineError[]=[
{
id:1,
time:"08:15",
machine:"Machine 02",
error:"Low Air Pressure",
severity:"Medium",
duration:"15 mins",
status:"Pending"
},
{
id:2,
time:"09:40",
machine:"Machine 03",
error:"Motor Fault",
severity:"High",
duration:"30 mins",
status:"Open"
}
];