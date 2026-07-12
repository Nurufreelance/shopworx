import DowntimeLogHeader from "../components/DowntimeLogHeader";
import DowntimeLogTable from "../components/DowntimeLogTable";

export default function DowntimeLog() {
  return (
    <div
      className="
        min-h-screen
        bg-[#F5F6FA]
        px-8
        py-6
      "
    >

      <DowntimeLogHeader />

      <div className="mt-4">

        <DowntimeLogTable />

      </div>

    </div>
  );
}