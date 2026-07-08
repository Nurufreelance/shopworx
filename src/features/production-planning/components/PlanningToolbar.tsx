import {
    Plus,
    ArrowUpDown,
    Filter,
    Wrench,
} from "lucide-react";

export default function PlanningToolbar() {

    return (

        <div className="flex justify-between items-center">

            <h2 className="text-3xl">

                7 Jul, 2026 - 7 Jul, 2026

            </h2>

            <div className="flex gap-3">

                <button className="bg-green-500 text-white px-5 py-2 rounded">

                    <Wrench className="inline mr-2" size={18} />

                    Equipment Change

                </button>

                <button className="bg-[#3548A5] text-white px-5 py-2 rounded">

                    <Plus className="inline mr-2" size={18} />

                    Add new plan

                </button>

                <button className="border px-4 py-2 rounded">

                    <ArrowUpDown className="inline mr-2" size={18} />

                    Re-order plans

                </button>

                <button className="border px-4 py-2 rounded">

                    List

                </button>

                <button className="border px-4 py-2 rounded">

                    <Filter className="inline mr-2" size={18} />

                    Filters

                </button>

            </div>

        </div>

    );

}