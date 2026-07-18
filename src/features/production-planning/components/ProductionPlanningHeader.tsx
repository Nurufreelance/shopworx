import PlanningToolbar from "./PlanningToolbar";

export const PlanningToolbar today = new Date = () => {

  const date = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="bg-white border-b border-[#E5E7EB]">

      <div className="flex items-center justify-between px-8 py-5">

        <div>

          <h1 className="text-[28px] font-semibold text-[#1F2937]">
            Production Planning
          </h1>

          <div className="mt-2 flex items-center gap-8 text-sm">

            <div>
              <p className="text-[#98A2B3] text-xs uppercase">
                Date
              </p>

              <p className="font-semibold text-[#344054]">
                {date}
              </p>
            </div>

            <div>
              <p className="text-[#98A2B3] text-xs uppercase">
                Machine
              </p>

              <p className="font-semibold text-[#344054]">
                HT-28 / HT-270
              </p>
            </div>

          </div>

        </div>

        <PlanningToolbar />

      </div>

    </section>
  );
}