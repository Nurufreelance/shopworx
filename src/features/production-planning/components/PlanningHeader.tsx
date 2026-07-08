import { Info, Settings, RefreshCcw } from "lucide-react";

export default function PlanningHeader() {

    return (

        <div className="flex items-center gap-4">

            <h1 className="text-5xl font-light">

                Production Planning

            </h1>

            <Info />

            <Settings />

            <RefreshCcw />

        </div>

    );

}