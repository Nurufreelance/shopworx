import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
}

export default function PageTitle({
  title,
  icon,
  subtitle,
}: Props) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-light text-gray-800">
          {title}
        </h1>

        {icon}
      </div>

      {subtitle && (
        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}