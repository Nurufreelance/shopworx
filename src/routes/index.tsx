import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@components/layout/DashboardLayout';

// Lazy load pages
const Login = lazy(() => import('@features/auth/pages/Login'));
const Home = lazy(() => import('@features/dashboard/pages/Dashboard'));
const ShiftSummary = lazy(() => import('@features/oee/pages/ShiftSummary'));
const ShiftProduction = lazy(() => import('@features/shift-production/pages/ShiftProduction'));
const ProductionPlanning = lazy(() => import('@features/production-planning/pages/ProductionPlanning'));
const ProductionOrder = lazy(() => import('@features/production-order/pages/ProductionOrder'));
const ProductionLog = lazy(() => import('@features/production-log/pages/ProductionLog'));
const DowntimeLog = lazy(() => import('@features/downtime-log/pages/DowntimeLog'));
const Downtime = lazy(() => import('@features/downtime/pages/Downtime'));
const QualityReport = lazy(() => import('@features/reports/pages/QualityReport'));
const LiveShopfloor = lazy(() => import('@features/live-shopfloor/pages/LiveShopfloor'));
const ProductionReport = lazy(() => import('@features/reports/pages/ProductionReport'));
const DowntimeReport = lazy(() => import('@features/reports/pages/DowntimeReport')); // ✅ ADD THIS
const PerformanceReport = lazy(() => import('@features/reports/pages/PerformanceReport'));
const MasterData = lazy(() => import('@features/master-data/pages/MasterData'));
const Settings = lazy(() => import('@features/settings/pages/Settings'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-[#2F6BFF] border-t-transparent rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <Suspense fallback={<PageLoader />}><Login /></Suspense>,
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
        { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
        { path: 'shift-summary', element: <Suspense fallback={<PageLoader />}><ShiftSummary /></Suspense> },
        { path: 'shift-production', element: <Suspense fallback={<PageLoader />}><ShiftProduction /></Suspense> },
        { path: 'production-planning', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        { path: 'production-order', element: <Suspense fallback={<PageLoader />}><ProductionOrder /></Suspense> },
        { path: 'production-log', element: <Suspense fallback={<PageLoader />}><ProductionLog /></Suspense> },
        { path: 'productionlog', element: <Suspense fallback={<PageLoader />}><ProductionLog /></Suspense> },
        { path: 'downtime-log', element: <Suspense fallback={<PageLoader />}><DowntimeLog /></Suspense> },
        { path: 'downtime', element: <Suspense fallback={<PageLoader />}><Downtime /></Suspense> },
        { path: 'live-shopfloor', element: <Suspense fallback={<PageLoader />}><LiveShopfloor /></Suspense> },
        // Reports
        { path: 'reports/production', element: <Suspense fallback={<PageLoader />}><ProductionReport /></Suspense> },
        { path: 'reports/downtime', element: <Suspense fallback={<PageLoader />}><DowntimeReport /></Suspense> },
        { path: 'reports/quality', element: <Suspense fallback={<PageLoader />}><QualityReport /></Suspense> },
        { path: 'reports/performance', element: <Suspense fallback={<PageLoader />}><PerformanceReport /></Suspense> },
        { path: 'master-data', element: <Suspense fallback={<PageLoader />}><MasterData /></Suspense> },
        { path: 'settings', element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);