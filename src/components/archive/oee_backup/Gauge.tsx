import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface OEEGaugeProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  subValue?: string;
}

export const OEEGauge = ({ value, label = 'OEE', size = 'lg', subValue }: OEEGaugeProps) => {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-40 h-40',
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
          textSize: '20px',
          pathColor: getColor(value),
          textColor: '#1F2937',
          trailColor: '#E5E7EB',
          pathTransitionDuration: 0.5,
        })}
      />
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{label}</span>
        {subValue && (
          <div className="text-[11px] font-medium text-[#31B86A]">{subValue}</div>
        )}
      </div>
    </div>
  );
};