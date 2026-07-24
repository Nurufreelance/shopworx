import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface OEEGaugeProps {
  value: number;
  trend?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OEEGauge = ({ value, trend, label = 'OEE', size = 'md' }: OEEGaugeProps) => {
  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const getColor = (val: number) => {
    if (val >= 85) return '#31B86A';
    if (val >= 60) return '#F4A62A';
    return '#EF5350';
  };

  return (
    <div className={`${sizes[size]} relative`}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: getColor(value),
          textColor: '#1F2937',
          trailColor: '#E5E7EB',
          pathTransitionDuration: 0.5,
        })}
      />
      {trend !== undefined && (
        <div className="text-[10px] font-medium text-[#31B86A] text-center mt-1">
          ▲{Math.abs(trend)}%
        </div>
      )}
      <div className="text-[9px] text-[#6B7280] uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  );
};