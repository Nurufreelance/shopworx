import {
  Home,
  ClipboardList,
  FileText,
  AlertTriangle,
  Monitor,
  BarChart3,
  ShieldCheck,
  Gauge,
  Database,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    section: "",
    items: [
      {
        label: "Home",
        path: "/",
        icon: Home,
      },
      {
        label: "Production Planning",
        path: "/production-planning",
        icon: ClipboardList,
      },
      {
        label: "Production Log",
        path: "/production-log",
        icon: FileText,
      },
      {
        label: "Downtime Log",
        path: "/downtime-log",
        icon: AlertTriangle,
      },
      {
        label: "Live Shopfloor",
        path: "/live-shopfloor",
        icon: Monitor,
      },
    ],
  },

  {
    section: "",
    items: [
      {
        label: "Reports",
        path: "/reports",
        icon: BarChart3,
      },
      {
        label: "Quality",
        path: "/quality",
        icon: ShieldCheck,
      },
      {
        label: "Performance",
        path: "/performance",
        icon: Gauge,
      },
    ],
  },

  {
    section: "",
    items: [
      {
        label: "Master Data",
        path: "/master-data",
        icon: Database,
      },
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];