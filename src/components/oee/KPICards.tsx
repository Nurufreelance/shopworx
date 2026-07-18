interface KPICardProps {
  value: number;
  label: string;
  trend?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const KPICard = ({ value, label, trend, isSelected, onClick }: KPICardProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-center transition-colors ${
        isSelected ? 'border-b-2 border-[#2F6BFF]' : 'opacity-50 hover:opacity-100'
      }`}
    >
      <div className={`text-lg font-bold ${isSelected ? 'text-[#2F6BFF]' : 'text-[#1F2937]'}`}>
        {value}%
      </div>
      {trend !== undefined && (
        <div className="text-[11px] font-medium text-[#31B86A]">
          ▲{Math.abs(trend)}%
        </div>
      )}
      <div className={`text-[11px] ${isSelected ? 'text-[#2F6BFF]' : 'text-[#6B7280]'}`}>
        {label}
      </div>
    </button>
  );
};

interface KPICardsProps {
  kpis: Array<{ key: string; value: number; label: string; trend?: number }>;
  selected: string;
  onSelect: (key: string) => void;
}

export const KPICards = ({ kpis, selected, onSelect }: KPICardsProps) => {
  return (
    <div className="flex items-center gap-2 mt-6">
      <button className="text-[#6B7280] hover:text-[#1F2937] text-xl">‹</button>
      <div className="flex gap-4">
        {kpis.map((kpi) => (
          <KPICard
            key={kpi.key}
            value={kpi.value}
            label={kpi.label}
            trend={kpi.trend}
            isSelected={selected === kpi.key}
            onClick={() => onSelect(kpi.key)}
          />
        ))}
      </div>
      <button className="text-[#6B7280] hover:text-[#1F2937] text-xl">›</button>
    </div>
  );
};