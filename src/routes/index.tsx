import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@components/layout/DashboardLayout';

// Lazy load pages
const Home = lazy(() => import('@features/home/pages/Home'));
const ProductionPlanning = lazy(() => import('@features/production-planning/pages/ProductionPlanning'));
const ProductionOrder = lazy(() => import('@features/production-order/pages/ProductionOrder'));
const ProductionLog = lazy(() => import('@features/production-log/pages/ProductionLog'));
const DowntimeLog = lazy(
  () => import("@features/downtime-log/pages/DowntimeLog")
);
const Downtime = lazy(() => import('@features/downtime/pages/Downtime'));
const LiveShopfloor = lazy(() => import('@features/live-shopfloor/pages/LiveShopfloor'));
const Reports = lazy(() => import('@features/reports/pages/Reports'));
const MasterData = lazy(() => import('@features/master-data/pages/MasterData'));
const Settings = lazy(() => import('@features/settings/pages/Settings'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-[#2F6BFF] border-t-transparent rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
        { path: 'production-planning', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        {
  path: 'production-order',
  element: (
    <Suspense fallback={<PageLoader />}>
      <ProductionOrder />
    </Suspense>
  ),
},
        { path: 'downtime-log', element: <Suspense fallback={<PageLoader />}><DowntimeLog /></Suspense> },
        { path: 'production-log', element: <Suspense fallback={<PageLoader />}><ProductionLog /></Suspense> },
        { path: 'downtime', element: <Suspense fallback={<PageLoader />}><Downtime /></Suspense> },
        { path: 'live-shopfloor', element: <Suspense fallback={<PageLoader />}><LiveShopfloor /></Suspense> },
        { path: 'reports', element: <Suspense fallback={<PageLoader />}><Reports /></Suspense> },
        { path: 'master-data', element: <Suspense fallback={<PageLoader />}><MasterData /></Suspense> },
        { path: 'settings', element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,  // ← This fixes the React Router warning!
    },
  }
);