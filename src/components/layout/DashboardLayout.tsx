import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#EEF2F7]">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Global Header */}

        <Header />

        {/* Current Feature */}

        <div className="flex-1 overflow-y-auto">

          <Outlet />

        </div>

      </div>

    </div>
  );
};