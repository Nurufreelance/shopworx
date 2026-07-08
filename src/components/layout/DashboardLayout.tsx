import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Header from "../components/layout/Header/Header";

export default function DashboardLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main
          className="
          flex-1
          bg-[#f5f6f8]
          p-6
          overflow-auto
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}