import {
  ResponsiveContainer,
  LineChart as Chart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data:any[];
}

export default function LineChart({
    data,
}:Props){

return(

<div className="h-72">

<ResponsiveContainer>

<Chart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="production"
stroke="#F97316"
strokeWidth={3}
/>

</Chart>

</ResponsiveContainer>

</div>

)

}