// src/features/dashboard/components/OEEDonut.tsx

import React from 'react';

interface OEEDonutProps {
  value: number;
  trend: number;
  label: string;
}

export const OEEDonut: React.FC<OEEDonutProps> = ({ value, trend, label = 'OEE' }) => {
  const size = 220;
  const radius = size / 2;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
  const progress = Math.min((value / 100) * circumference, circumference);
  const isPositive = trend >= 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background track */}
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
            stroke="#2C3E9E"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[36px] font-bold text-[#1E3A8A] leading-none">
            {value.toFixed(2)}%
          </span>
          <span className={`text-[14px] font-medium flex items-center gap-1 mt-1 ${isPositive ? 'text-[#059669]' : 'text-[#EF4444]'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(trend).toFixed(2)}%
          </span>
        </div>
      </div>
      <span className="text-[#64748B] font-medium mt-2">{label}</span>
    </div>
  );
};