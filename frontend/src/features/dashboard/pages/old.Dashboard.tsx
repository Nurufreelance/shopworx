// src/features/dashboard/pages/Dashboard.tsx

import { useState } from 'react';
import { DashboardHeader } from '../components/old.DashboardHeader';
import { ShiftOEE } from '../components/ShiftOEE';
import { ShiftProduction } from '../components/ShiftProduction';
import { ShiftDowntime } from '../components/ShiftDowntime';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9]">
      {/* Sticky Header */}
      <DashboardHeader
        shift="Shift1"
        date="2026-07-24"
        onRefresh={handleRefresh}
        onSearch={(query) => console.log('Search:', query)}
        onSync={() => console.log('Sync')}
        onHelp={() => console.log('Help')}
        onAvatarClick={() => console.log('Avatar clicked')}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* OEE - 35% width */}
          <div className="lg:col-span-4">
            <ShiftOEE shift="Shift1, 2026-07-24" />
          </div>

          {/* Production - 65% width */}
          <div className="lg:col-span-8">
            <ShiftProduction shift="Shift1, 2026-07-24" />
          </div>
        </div>

        {/* Downtime - Full width */}
        <div className="mt-4">
          <ShiftDowntime shift="Shift1, 2026-07-24" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;