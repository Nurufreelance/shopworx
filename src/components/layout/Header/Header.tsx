import {
    Bell,
    Search,
    RefreshCcw,
    CircleHelp,
    UserCircle2,
} from "lucide-react";

export default function Header() {
    return (
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">

            <div className="flex items-center gap-5">

                <h1 className="text-[18px] font-semibold text-[#2F2F2F]">

                    Shift Summary

                </h1>

                <button className="border border-[#3F51B5] text-[#3F51B5] rounded px-4 py-1 text-sm">

                    Shift1, 2026-07-06

                </button>

                <RefreshCcw
                    size={20}
                    className="text-gray-500 cursor-pointer"
                />

            </div>

            <div className="flex items-center gap-5">

                <div className="relative">

                    <Search
                        className="absolute left-4 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        placeholder="Search reports & insights"
                        className="w-[360px] h-10 rounded-full border border-gray-300 pl-11 pr-5 outline-none"
                    />

                </div>

                <Bell size={19} />

                <CircleHelp size={19} />

                <UserCircle2 size={30} />

            </div>

        </header>
    );
}