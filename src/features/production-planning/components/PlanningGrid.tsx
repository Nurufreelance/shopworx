import { ReactNode } from "react";
import PlanningGridHeader from "./PlanningGridHeader";

interface Props {
  children: ReactNode;
}

export default function PlanningGrid({ children }: Props) {
  return (
    <section className="flex-1 overflow-auto bg-white">

      <PlanningGridHeader />

      <div className="min-w-[1200px]">

        {children}

      </div>

    </section>
  );
}