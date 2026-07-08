import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
      bg-white
      rounded-xl
      border
      border-gray-200
      shadow-sm
      p-5
      ${className}
    `}
    >
      {title && (
        <h2 className="text-[15px] font-semibold text-gray-700 mb-5">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}