import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface Props {
  item: {
    label: string;
    path: string;
    icon: React.ElementType;
  };
}

export default function SidebarItem({ item }: Props) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      title={item.label}
      className={({ isActive }) =>
        clsx(
          "group flex items-center gap-4 mx-3 px-4 h-11 rounded-full transition-all duration-200",

          isActive
            ? "bg-[#F97316]/20 text-[#F97316]"
            : "text-gray-200 hover:bg-[#303030] hover:text-white"
        )
      }
    >
      <Icon size={20} strokeWidth={1.8} />

      <span className="text-[15px] font-medium">
        {item.label}
      </span>
    </NavLink>
  );
}