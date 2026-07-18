import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductionService } from '@services/api/production.service';

// ==================== TYPES ====================
interface ShiftOEEProps {
  shift?: 'A' | 'B' | 'C';
}

// ==================== MOCK DATA ====================
const mockAvailabilityData = [
  { name: 'HT-27-HT-270', availability: 99.2, previous: 97.5 },
  { name: 'HT-39-HT-270', availability: 98.7, previous: 96.8 },
  { name: 'LI-43-HT-1000', availability: 99.8, previous: 98.9 },
  { name: 'MI-04-FU-110', availability: 20.4, previous: 85.6 },
  { name: 'MI-10-HT-120', availability: 97.3, previous: 95.1 },
  { name: 'MI-17-HT-200', availability: 98.1, previous: 97.8 },
  { name: 'MI-23-HT-300', availability: 96.5, previous: 94.2 },
  { name: 'LI-42-HT-700', availability: 55.0, previous: 88.3 },
  { name: 'HT-53-HT-200', availability: 85.0, previous: 82.4 },
  { name: 'MI-10-HT-160', availability: 60.0, previous: 90.1 },
  { name: 'MI-15-HT-200', availability: 97.8, previous: 96.5 },
  { name: 'HT-37-HT-260', availability: 98.3, previous: 97.2 },
];

const mockDowntimeMachineData = [
  { name: 'MI-26-OC', value: 550, cumulative: 18.2 },
  { name: 'LI-41-HXM', value: 548, cumulative: 36.3 },
  { name: 'LI-44-HXM', value: 430, cumulative: 50.6 },
  { name: 'MI-15-HT-200', value: 230, cumulative: 58.2 },
  { name: 'HT-37-HT-260', value: 170, cumulative: 63.8 },
  { name: 'MI-24-OM', value: 155, cumulative: 68.9 },
  { name: 'MI-19-HT-250', value: 140, cumulative: 73.5 },
  { name: 'HT-35-FERO', value: 120, cumulative: 77.5 },
  { name: 'HT-29-HXH', value: 105, cumulative: 80.9 },
  { name: 'MI-16-FU-110', value: 90, cumulative: 83.9 },
  { name: 'MI-04-FU-110', value: 70, cumulative: 86.2 },
  { name: 'MI-20-FU-280', value: 55, cumulative: 88.0 },
  { name: 'HT-31-HT-270', value: 40, cumulative: 89.3 },
  { name: 'LI-45-HT-1000', value: 25, cumulative: 90.1 },
  { name: 'MI-18-HT-250', value: 15, cumulative: 90.6 },
];

const mockDowntimeReasonData = [
  { name: 'No Plan', value: 3450 },
  { name: 'Nozzle blockage', value: 165 },
  { name: 'Process Fault', value: 50 },
  { name: 'Mould Breakdown', value: 22 },
  { name: 'Machine Breakdown', value: 15 },
  { name: 'Machine Start Up', value: 5 },
];

// ==================== OEE GAUGE COMPONENT ====================
const OEEGauge = ({ value, trend, label }: { value: number; trend: number; label: string }) => {
  const size = typeof window !== 'undefined' && window.innerWidth < 640 ? 160 : 230;
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const strokeWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 16;
  const fontSize = typeof window !== 'undefined' && window.innerWidth < 640 ? '32px' : '56px';
  const trendSize = typeof window !== 'undefined' && window.innerWidth < 640 ? '14px' : '18px';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#33479A"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-semibold text-[#33479A] leading-none" style={{ fontSize }}>
            {value.toFixed(2)}%
          </span>
          <span className="text-[#49B94A] flex items-center gap-1 mt-1" style={{ fontSize: trendSize }}>
            <span>▲</span> {trend.toFixed(2)}%
          </span>
        </div>
      </div>
      <span className="text-[18px] text-[#666666] mt-8 font-medium max-sm:text-[14px] max-sm:mt-4">{label}</span>
    </div>
  );
};

// ==================== KPI ROW COMPONENT ====================
const KPIRow = ({ kpis, selected, onSelect }: any) => {
  return (
    <div className="flex flex-col sm:flex-row w-full mt-8 border-t border-[#E5E7EB] pt-6 gap-4 sm:gap-0">
      {kpis.map((kpi: any) => (
        <button
          key={kpi.key}
          onClick={() => onSelect(kpi.key)}
          className="flex-1 text-center relative group"
        >
          <div className="text-[14px] text-[#666666] font-normal max-sm:text-[12px]">{kpi.label}</div>
          <div className="text-[18px] font-semibold text-[#222222] mt-1 max-sm:text-[16px]">
            {kpi.value.toFixed(2)}%
          </div>
          <div className="text-[14px] text-[#49B94A] flex items-center justify-center gap-1 mt-0.5 max-sm:text-[12px]">
            <span>▲</span> {kpi.trend.toFixed(2)}%
          </div>
          <div
            className={`h-[2px] bg-[#33479A] transition-all duration-300 mx-auto mt-3 ${
              selected === kpi.key ? 'w-[110px] max-sm:w-[60px] opacity-100' : 'w-0 opacity-0'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// ==================== AVAILABILITY CHART ====================
const AvailabilityChart = ({ data }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const maxValue = 125;
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartHeight = isMobile ? 220 : 340;
  const barWidth = isMobile ? 6 : 10;
  const gap = isMobile ? 2 : 3;
  const labelSize = isMobile ? '8px' : '11px';

  // Limit data for mobile
  const displayData = isMobile ? data.slice(0, 8) : data;

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[300px]" style={{ height: chartHeight }}>
        <div className="relative w-full h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 sm:py-6">
            {[0, 25, 50, 75, 100, 125].map((val) => (
              <span key={val} className="text-[#666666] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {val}
              </span>
            ))}
          </div>

          {/* Chart area */}
          <div className="ml-8 sm:ml-10 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 sm:py-6">
              {[0, 25, 50, 75, 100, 125].map((val) => (
                <div
                  key={val}
                  className="w-full border-t border-[#E6E6E6]"
                  style={{ height: '20%' }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around px-1 pb-6 sm:pb-8">
              {displayData.map((item: any, index: number) => (
                <div key={index} className="flex items-end gap-[2px] sm:gap-[3px] h-full">
                  <div
                    className="bg-[#33479A] rounded-t-[2px] transition-all duration-700"
                    style={{
                      height: `${(item.availability / maxValue) * 85}%`,
                      width: `${barWidth}px`,
                    }}
                  />
                  <div
                    className="bg-[#BEBEBE] rounded-t-[2px] transition-all duration-700"
                    style={{
                      height: `${(item.previous / maxValue) * 85}%`,
                      width: `${barWidth}px`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around">
              {displayData.map((item: any, index: number) => (
                <span
                  key={index}
                  className="text-[#666666] italic origin-top-left"
                  style={{
                    fontSize: labelSize,
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    maxWidth: isMobile ? '30px' : 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {isMobile ? item.name.substring(0, 6) : item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PARETO CHART ====================
const ParetoChart = ({ data, leftLabel, rightLabel }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const maxValue = Math.max(...data.map((d: any) => d.value));
  const maxCumulative = 100;
  const chartHeight = isMobile ? 250 : 350;
  const labelSize = isMobile ? '8px' : '11px';

  // Limit data for mobile
  const displayData = isMobile ? data.slice(0, 8) : data;

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[300px]" style={{ height: chartHeight }}>
        <div className="relative w-full h-full">
          {/* Left Y-axis */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 sm:py-6">
            {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((val, i) => (
              <span key={i} className="text-[#666666] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {i === 0 ? '0' : Math.round(val)}
              </span>
            ))}
          </div>

          {/* Right Y-axis */}
          <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-2 sm:py-6">
            {[0, 25, 50, 75, 100].map((val) => (
              <span key={val} className="text-[#666666] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {val}%
              </span>
            ))}
          </div>

          {/* Chart area */}
          <div className="mx-8 sm:mx-12 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 sm:py-6">
              {[0, 25, 50, 75, 100].map((val) => (
                <div
                  key={val}
                  className="w-full border-t border-[#E6E6E6]"
                  style={{ height: '25%' }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between px-1 pb-6 sm:pb-8">
              {displayData.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-[#4A4A50] rounded-t-[2px] transition-all duration-700"
                  style={{
                    height: `${(item.value / maxValue) * 85}%`,
                    width: `${Math.max(4, 60 / displayData.length)}px`,
                  }}
                />
              ))}
            </div>

            {/* Cumulative line */}
            <div className="absolute inset-0 pb-6 sm:pb-8">
              <svg className="w-full h-full">
                <polyline
                  points={displayData
                    .map((item: any, index: number) => {
                      const x = (index / (displayData.length - 1)) * 100;
                      const y = 100 - (item.cumulative / maxCumulative) * 85;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#76AEEB"
                  strokeWidth="2"
                />
                {displayData.map((item: any, index: number) => {
                  const x = (index / (displayData.length - 1)) * 100;
                  const y = 100 - (item.cumulative / maxCumulative) * 85;
                  return (
                    <circle key={index} cx={x} cy={y} r="3" fill="#76AEEB" />
                  );
                })}
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
              {displayData.map((item: any, index: number) => (
                <span
                  key={index}
                  className="text-[#666666] origin-top-left"
                  style={{
                    fontSize: labelSize,
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    maxWidth: isMobile ? '25px' : 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {isMobile && item.name.length > 8 ? item.name.substring(0, 4) + '…' : item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export const ShiftOEE = ({ shift = 'A' }: ShiftOEEProps) => {
  const [loading, setLoading] = useState(true);
  const [oeeData, setOeeData] = useState<any>(null);
  const [selectedKPI, setSelectedKPI] = useState('availability');
  const [selectedShift, setSelectedShift] = useState('Shift2');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductionService.getOEE();
        setOeeData(data);
      } catch (error) {
        setOeeData({
          oee: 59.64,
          trend: 7.48,
          availability: 77.69,
          availabilityTrend: 3.19,
          performance: 77.02,
          performanceTrend: 5.55,
          quality: 99.0,
          qualityTrend: 0.63,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-4 sm:p-6 w-full">
        <div className="flex items-center justify-center h-64 text-[#6B7280]">
          Loading...
        </div>
      </div>
    );
  }

  const kpis = [
    {
      key: 'availability',
      value: oeeData?.availability || 77.69,
      label: 'Availability',
      trend: oeeData?.availabilityTrend || 3.19,
    },
    {
      key: 'performance',
      value: oeeData?.performance || 77.02,
      label: 'Performance',
      trend: oeeData?.performanceTrend || 5.55,
    },
    {
      key: 'quality',
      value: oeeData?.quality || 99.0,
      label: 'Quality',
      trend: oeeData?.qualityTrend || 0.63,
    },
  ];

  return (
    <motion.div
      className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-4 sm:p-6 md:p-8 w-full max-w-full overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
        <h2 className="text-[18px] sm:text-[22px] font-medium text-[#222222]">Shift summary</h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 border border-[#E5E7EB] rounded px-2 sm:px-3 py-1.5 flex-1 sm:flex-none">
            <span className="text-[12px] sm:text-[14px] text-[#666666] truncate">
              {selectedShift}, 2026-07-17
            </span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#666666] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== SHIFT OEE LABEL ===== */}
      <div className="mb-4 sm:mb-6">
        <span className="text-[16px] sm:text-[18px] font-medium text-[#222222]">Shift OEE</span>
      </div>

      {/* ===== OEE GAUGE ===== */}
      <div className="flex justify-center mb-6 sm:mb-8 overflow-hidden">
        <OEEGauge
          value={oeeData?.oee || 59.64}
          trend={oeeData?.trend || 7.48}
          label="OEE"
        />
      </div>

      {/* ===== KPI ROW ===== */}
      <KPIRow kpis={kpis} selected={selectedKPI} onSelect={setSelectedKPI} />

      {/* ===== CHART 1: AVAILABILITY COMPARISON ===== */}
      <div className="mt-8 sm:mt-12">
        <h3 className="text-[14px] sm:text-[16px] font-medium text-[#222222] text-center mb-3 sm:mb-4">
          Availability comparision
        </h3>
        <AvailabilityChart data={mockAvailabilityData} />
      </div>

      {/* ===== CHART 2: DOWNTIME BY MACHINE ===== */}
      <div className="mt-10 sm:mt-14">
        <h3 className="text-[14px] sm:text-[16px] font-medium text-[#222222] text-center mb-3 sm:mb-4">
          Downtime by machine
        </h3>
        <ParetoChart
          data={mockDowntimeMachineData}
          leftLabel="Downtime (min)"
          rightLabel="Cumulative %"
        />
      </div>

      {/* ===== CHART 3: DOWNTIME BY REASON ===== */}
      <div className="mt-10 sm:mt-14">
        <h3 className="text-[14px] sm:text-[16px] font-medium text-[#222222] text-center mb-3 sm:mb-4">
          Downtime by reason
        </h3>
        <ParetoChart
          data={mockDowntimeReasonData}
          leftLabel="Downtime (min)"
          rightLabel="Cumulative %"
        />
      </div>
    </motion.div>
  );
};