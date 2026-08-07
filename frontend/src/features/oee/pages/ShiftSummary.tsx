import { useState, useEffect } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { OEEGauge } from '@components/oee/OEEGauge';
import { KPICards } from '@components/oee/KPICards';
import { AvailabilityChart } from '@components/charts/AvailabilityChart';
import { DowntimeMachineChart } from '@components/charts/DowntimeMachineChart';
import { DowntimeReasonChart } from '@components/charts/DowntimeReasonChart';
import { ShiftBar } from '@components/layout/ShiftBar';
import { BottomNavigation } from '@components/layout/BottomNavigation';
import { motion } from 'framer-motion';

// EXACT DATA FROM SCREENSHOT
const mockAvailabilityData = [
  { name: 'M1-01-17', availability: 85 },
  { name: 'M1-04-17', availability: 72 },
  { name: 'M1-07-17', availability: 65 },
  { name: 'M1-10-17', availability: 90 },
  { name: 'M1-13-17', availability: 55 },
  { name: 'M1-16-17', availability: 78 },
  { name: 'M1-19-17', availability: 82 },
  { name: 'M1-22-17', availability: 68 },
  { name: 'M1-25-17', availability: 75 },
  { name: 'M1-28-17', availability: 88 },
  { name: 'M2-01-17', availability: 60 },
  { name: 'M2-04-17', availability: 70 },
];

const mockDowntimeMachineData = [
  { name: 'M1-01-17', value: 320, cumulative: 35 },
  { name: 'M1-04-17', value: 280, cumulative: 65 },
  { name: 'M1-07-17', value: 200, cumulative: 85 },
  { name: 'M1-10-17', value: 120, cumulative: 95 },
  { name: 'M1-13-17', value: 80, cumulative: 100 },
  { name: 'M1-16-17', value: 60, cumulative: 100 },
  { name: 'M1-19-17', value: 40, cumulative: 100 },
  { name: 'M1-22-17', value: 30, cumulative: 100 },
  { name: 'M1-25-17', value: 20, cumulative: 100 },
  { name: 'M1-28-17', value: 15, cumulative: 100 },
  { name: 'M2-01-17', value: 10, cumulative: 100 },
  { name: 'M2-04-17', value: 5, cumulative: 100 },
];

const mockDowntimeReasonData = [
  { name: 'Power Failure', value: 9500 },
  { name: 'Machine Shutdown', value: 7500 },
  { name: 'No reason', value: 5000 },
  { name: 'PPM', value: 3000 },
  { name: 'No Plant', value: 2000 },
  { name: 'Material Shortage', value: 1500 },
  { name: 'Mold Change', value: 1000 },
  { name: 'Mold Breakdown', value: 800 },
  { name: 'Process Fault', value: 600 },
  { name: 'Machine Communication Error', value: 400 },
  { name: 'Mold Failure', value: 200 },
];

export default function ShiftSummary() {
  const [loading, setLoading] = useState(true);
  const [oeeData, setOeeData] = useState<any>(null);
  const [selectedKPI, setSelectedKPI] = useState('availability');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductionService.getOEE();
        setOeeData(data);
      } catch (error) {
        // EXACT NUMBERS FROM SCREENSHOT
        setOeeData({
          oee: 25.87,
          trend: 15.73,
          availability: 39.44,
          performance: 27.88,
          quality: 66.53,
          qualityTrend: 27.38,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <PageLayout title="Shift summary">
        <div className="flex items-center justify-center h-64 text-[#6B7280]">
          Loading...
        </div>
      </PageLayout>
    );
  }

  const kpis = [
    { key: 'availability', value: oeeData?.availability || 39.44, label: 'Availability', trend: 27.88 },
    { key: 'performance', value: oeeData?.performance || 66.53, label: 'Performance', trend: 27.38 },
    { key: 'quality', value: oeeData?.quality || 98.6, label: 'Quality', trend: 5.12 },
  ];

  return (
    <PageLayout title="Shift summary">
      <div className="max-w-6xl mx-auto pb-24">
        {/* Shift Header */}
        <div className="text-[14px] text-[#6B7280] mb-4">
          Shift1, 2026-07-13
        </div>

        {/* OEE Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stratify-card mb-6"
        >
          <h3 className="text-[18px] font-medium text-[#1F2937] mb-4">Shift OEE</h3>
          <div className="flex flex-col items-center">
            <OEEGauge 
              value={oeeData?.oee || 25.87} 
              trend={oeeData?.trend || 15.73}
              label="OEE" 
              size="lg" 
            />
            <KPICards 
              kpis={kpis}
              selected={selectedKPI}
              onSelect={setSelectedKPI}
            />
          </div>
        </motion.div>

        {/* Chart 1: Availability Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stratify-card mb-6"
        >
          <h3 className="text-[13px] font-medium text-[#1F2937] mb-4">Availability comparison</h3>
          <AvailabilityChart data={mockAvailabilityData} />
        </motion.div>

        {/* Chart 2: Downtime by Machine */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stratify-card mb-6"
        >
          <h3 className="text-[13px] font-medium text-[#1F2937] mb-4">Downtime by machine</h3>
          <DowntimeMachineChart data={mockDowntimeMachineData} />
        </motion.div>

        {/* Chart 3: Downtime by Reason */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stratify-card mb-6"
        >
          <h3 className="text-[13px] font-medium text-[#1F2937] mb-4">Downtime by reason</h3>
          <DowntimeReasonChart data={mockDowntimeReasonData} />
        </motion.div>

        {/* Floating Shift Bar */}
        <ShiftBar shift="Shift1" date="2026-07-13" />
        
        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </PageLayout>
  );
}