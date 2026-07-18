import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ClockIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  // ================= DASHBOARD =================
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    path: "/",                    // ← Navigates to root
    group: "dashboard",
  },
  {
    id: "live-shopfloor",
    label: "Live Shopfloor",
    icon: GlobeAltIcon,
    path: "/live-shopfloor",      // ← Navigates to live shopfloor
    group: "dashboard",
  },

  // ================= PRODUCTION =================
  {
    id: "production-planning",
    label: "Production Planning",
    icon: ClipboardDocumentListIcon,
    path: "/production-planning",
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
    path: "/downtime-log",        // ← Navigates to downtime log
    group: "production",
  },

  // ================= REPORTS =================
  {
    id: "reports-production",
    label: "Production Report",
    icon: ChartBarIcon,
    path: "/reports/production",
    group: "reports",
  },
  // ... etc
];