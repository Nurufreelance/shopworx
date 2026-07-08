import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@layouts/DashboardLayout";

const Home = lazy(() => import("@features/home/pages/Home"));

// OUR NEW Production Planning
const ProductionPlanning = lazy(
  () => import("@features/production-planning/pages/ProductionPlanning")
);

// Existing features (use their ACTUAL folder names)
const ProductionLog = lazy(
  () => import("@features/production-log/pages/ProductionLog")
);

const DowntimeLog = lazy(
  () => import("@features/downtime-log/pages/DowntimeLog")
);

const LiveShopfloor = lazy(
  () => import("@features/live-shopfloor/pages/LiveShopfloor")
);

const Reports = lazy(
  () => import("@features/reports/pages/Reports")
);

const Quality = lazy(
  () => import("@features/quality/pages/Quality")
);

const Performance = lazy(
  () => import("@features/performance/pages/Performance")
);

const MasterData = lazy(
  () => import("@features/master-data/pages/MasterData")
);

const Settings = lazy(
  () => import("@features/settings/pages/Settings")
);

const Loader = () => (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
);

const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<Loader />}>
    {component}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
      },
      {
        path: "production-planning",
        element: withSuspense(<ProductionPlanning />),
      },
      {
        path: "production-log",
        element: withSuspense(<ProductionLog />),
      },
      {
        path: "downtime-log",
        element: withSuspense(<DowntimeLog />),
      },
      {
        path: "live-shopfloor",
        element: withSuspense(<LiveShopfloor />),
      },
      {
        path: "reports",
        element: withSuspense(<Reports />),
      },
      {
        path: "quality",
        element: withSuspense(<Quality />),
      },
      {
        path: "performance",
        element: withSuspense(<Performance />),
      },
      {
        path: "master-data",
        element: withSuspense(<MasterData />),
      },
      {
        path: "settings",
        element: withSuspense(<Settings />),
      },
    ],
  },
]);