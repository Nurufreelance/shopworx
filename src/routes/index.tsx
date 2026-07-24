// src/routes/index.tsx

import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@components/layout/DashboardLayout';

// Lazy load pages
const Login = lazy(() => import('@features/auth/pages/Login'));
// ✅ Dashboard is the main page (from dashboard folder)
const Dashboard = lazy(() => import('@features/dashboard/pages/Dashboard'));
const ProductionPlanning = lazy(() => import('@features/production-planning/pages/ProductionPlanning'));
const ProductionLog = lazy(() => import('@features/production-log/pages/ProductionLog'));
const DowntimeLog = lazy(() => import('@features/downtime-log/pages/DowntimeLog'));
const LiveShopfloor = lazy(() => import('@features/live-shopfloor/pages/LiveShopfloor'));
const ProductionReport = lazy(() => import('@features/reports/pages/ProductionReport'));
const DowntimeReport = lazy(() => import('@features/reports/pages/DowntimeReport'));
const QualityReport = lazy(() => import('@features/reports/pages/QualityReport'));
const PerformanceReport = lazy(() => import('@features/reports/pages/PerformanceReport'));
const MasterData = lazy(() => import('@features/master-data/pages/MasterData'));

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
        // ✅ Dashboard is the default landing page
        { index: true, element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
        { path: 'home', element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
        { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
        
        // Main navigation
        { path: 'production-planning', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        { path: 'production-log', element: <Suspense fallback={<PageLoader />}><ProductionLog /></Suspense> },
        { path: 'downtime-log', element: <Suspense fallback={<PageLoader />}><DowntimeLog /></Suspense> },
        { path: 'live-shopfloor', element: <Suspense fallback={<PageLoader />}><LiveShopfloor /></Suspense> },
        
        // Reports
        { path: 'reports/production', element: <Suspense fallback={<PageLoader />}><ProductionReport /></Suspense> },
        { path: 'reports/downtime', element: <Suspense fallback={<PageLoader />}><DowntimeReport /></Suspense> },
        { path: 'reports/quality', element: <Suspense fallback={<PageLoader />}><QualityReport /></Suspense> },
        { path: 'reports/performance', element: <Suspense fallback={<PageLoader />}><PerformanceReport /></Suspense> },
        
        // Master Data
        { path: 'master-data', element: <Suspense fallback={<PageLoader />}><MasterData /></Suspense> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);