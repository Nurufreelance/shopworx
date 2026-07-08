import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200">

      <div className="px-6 py-4 border-b">

        <h2 className="font-semibold text-gray-700">

          {title}

        </h2>

      </div>

      <div className="p-6">

        {children}

      </div>

    </div>
  );
}