import { NavLink } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";

import { navigation } from "./navigation";
import { cn } from "@utils/cn";

export const Sidebar = () => {
  return (
    <Tooltip.Provider delayDuration={250}>
    <aside
  
      className="
        w-[300px]
        h-screen
        bg-[#212121]
        border-r
        border-[#2F2F2F]
        flex
        flex-col
        flex-shrink-0
      "
    >
      {/* ================= LOGO ================= */}

      <div className="h-[68px] border-b border-[#2F2F2F] px-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* ShopWorx-style temporary logo */}

          <div className="relative flex h-9 w-9 items-center justify-center">

            <div className="absolute h-7 w-7 rounded-full border-[2.5px] border-[#19C37D]" />

            <div className="absolute h-[2.5px] w-7 rotate-45 rounded-full bg-[#19C37D]" />

          </div>

          <h1 className="text-[22px] font-semibold tracking-tight text-white">
            ShopWorx
          </h1>

        </div>

      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <SidebarSection
          title="Dashboard"
          group="dashboard"
        />

        <SidebarSection
          title="Production"
          group="production"
        />

        <SidebarSection
          title="Reports"
          group="reports"
        />

        <SidebarSection
          title="System"
          group="system"
        />

      </nav>
{/* ================= USER ================= */}

        <div className="border-t border-[#2F2F2F] px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#34469C] text-sm font-semibold text-white">
              AF
            </div>

            <div className="min-w-0">

              <p className="truncate text-[13px] font-semibold text-white">
                ADEYEMO FARUQ
              </p>

              <p className="text-[11px] text-[#8A8F99]">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </aside>
      </Tooltip.Provider>
  );
};

interface SidebarSectionProps {
  title: string;
  group: string;
}

function SidebarSection({
  title,
  group,
}: SidebarSectionProps) {
  const items = navigation.filter(
    (item) => item.group === group
  );

  if (!items.length) return null;

  return (
    <section className="mb-10">

      <h2
        className="
          px-5
          mb-3
          text-[10px]
          font-semibold
          uppercase
          tracking-[2px]
          text-[#8A8F99]
        "
      >
        {title}
      </h2>

      <div className="space-y-1 px-3">

        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
          />
        ))}

      </div>

    </section>
  );
}

function MenuItem({ item }: any) {
  return (
    <Tooltip.Root>

      <Tooltip.Trigger asChild>

        <NavLink
          to={item.path}
          className={({ isActive }) =>
            cn(
              `
                group
                flex
                h-[46px]
                items-center
                gap-4
                rounded-xl
                px-4
                text-[14px]
                font-medium
                transition-all
                duration-200
              `,
              isActive
                ? `
                    bg-[#F97316]
                    text-white
                    shadow-md
                  `
                : `
                    text-[#C7CDD7]
                    hover:bg-[#2C2C2C]
                    hover:text-white
                  `
            )
          }
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />

          <span className="truncate">
            {item.label}
          </span>

        </NavLink>

      </Tooltip.Trigger>

      <Tooltip.Portal>

        <Tooltip.Content
          side="right"
          sideOffset={10}
          className="
            rounded-lg
            bg-[#111827]
            px-3
            py-2
            text-xs
            font-medium
            text-white
            shadow-xl
          "
        >
          {item.label}

          <Tooltip.Arrow className="fill-[#111827]" />

        </Tooltip.Content>

      </Tooltip.Portal>

    </Tooltip.Root>
  );
}