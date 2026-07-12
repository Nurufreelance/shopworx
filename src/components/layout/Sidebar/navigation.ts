import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ClockIcon,
  GlobeAltIcon,
  ChartBarIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  // ================= Dashboard =================
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    path: "/",
    group: "dashboard",
  },

  // ================= Production =================
  {
    id: "production-planning",
    label: "Production Planning",
    icon: ClipboardDocumentListIcon,
    path: "/production-planning",
    group: "production",
  },

  {
    id: "production-order",
    label: "Production Order",
    icon: ClipboardDocumentListIcon,
    path: "/production-order",
    group: "production",
  },

  {
    id: "production-log",
    label: "Production Log",
    icon: DocumentTextIcon,
    path: "/production-log",
    group: "production",
  },

  {
    id: "downtime-log",
    label: "Downtime Log",
    icon: ClockIcon,
    path: "/downtime-log",
    group: "production",
  },

  {
    id: "live-shopfloor",
    label: "Live Shopfloor",
    icon: GlobeAltIcon,
    path: "/live-shopfloor",
    group: "production",
  },

  // ================= Reports =================
  {
    id: "reports",
    label: "Reports",
    icon: ChartBarIcon,
    path: "/reports",
    group: "reports",
  },

  // ================= System =================
  {
    id: "master-data",
    label: "Master Data",
    icon: Squares2X2Icon,
    path: "/master-data",
    group: "system",
  },

  {
    id: "settings",
    label: "Settings",
    icon: Cog6ToothIcon,
    path: "/settings",
    group: "system",
  },
];