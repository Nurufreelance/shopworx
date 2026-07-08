import { useHome } from "../hooks/useHome";

export default function MachineStatus(){

const {machines}=useHome();

return(

<div className="bg-white rounded-lg border border-gray-200 p-5">

<h2 className="font-semibold text-lg mb-5">

Machine Status

</h2>

<div className="space-y-4">

{machines.map(machine=>(

<div
key={machine.id}
className="border rounded-lg p-4 hover:bg-gray-50 transition">

<div className="flex justify-between">

<h3 className="font-semibold">

{machine.machine}

</h3>

<span
className={`text-sm font-medium
${
machine.status==="Running"
?"text-green-600"
:machine.status==="Idle"
?"text-yellow-600"
:machine.status==="Maintenance"
?"text-orange-600"
:"text-red-600"
}
`}>

{machine.status}

</span>

</div>

<div className="mt-2 text-sm text-gray-500">

Operator: {machine.operator}

</div>

<div className="text-sm text-gray-500">

Product: {machine.product}

</div>

<div className="text-sm text-gray-500">

Shift {machine.shift}

</div>

<div className="mt-2">

Efficiency

<div className="h-2 bg-gray-200 rounded-full">

<div

style={{width:`${machine.efficiency}%`}}

className="h-2 rounded-full bg-orange-500"/>

</div>

</div>

</div>

))}

</div>

</div>

)

}