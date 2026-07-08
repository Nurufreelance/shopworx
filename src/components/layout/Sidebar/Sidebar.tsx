import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebar.config";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#212121] border-r border-[#2D2D2D] flex flex-col">

      {/* Logo */}

      <div className="h-14 flex items-center justify-between px-4 border-b border-[#2D2D2D]">

        <button className="text-gray-300 text-xl">
          ☰
        </button>

        <h1 className="text-white text-2xl font-semibold">
          ShopWorx
        </h1>

        <div className="w-5 h-5 rounded-full border-2 border-[#F97316]" />

      </div>

      <div className="flex-1 overflow-y-auto py-3">

        {sidebarItems.map((section, index) => (

          <SidebarSection
            key={index}
            title={section.section}
          >

            {section.items.map((item) => (

              <SidebarItem
                key={item.path}
                item={item}
              />

            ))}

          </SidebarSection>

        ))}

      </div>

    </aside>
  );
}