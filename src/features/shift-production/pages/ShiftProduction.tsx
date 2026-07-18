import { useState, useEffect } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { motion } from 'framer-motion';
import { formatNumber } from '@utils/format';

interface ProductionData {
  machine: string;
  plan: string;
  part: string;
  produced: number;
  accepted: number;
  rejected: number;
}

// EXACT DATA FROM SCREENSHOT
const mockData: ProductionData[] = [
  {
    machine: 'HT-28-HT-270',
    plan: '100-7017',
    part: 'Darvinks Visita Flip Cap',
    produced: 8759,
    accepted: 8759,
    rejected: 0,
  },
  {
    machine: 'HT-29-HT-270',
    plan: '100-6982',
    part: 'SFG - Crystal/Deep Bucket 5ltr Rndv',
    produced: 0,
    accepted: 0,
    rejected: 0,
  },
  {
    machine: 'HT-30-HT-270',
    plan: '100-7013',
    part: 'Crystal Spoon',
    produced: 41465,
    accepted: 41201,
    rejected: 264,
  },
  {
    machine: 'HT-32-FERO-275',
    plan: '100-7004',
    part: 'SFG - 50cc Cap',
    produced: 20022,
    accepted: 19408,
    rejected: 614,
  },
  {
    machine: 'HT-34-FERO-200',
    plan: '100-7019',
    part: 'SFG - 30gm Visita Cap',
    produced: 0,
    accepted: 0,
    rejected: 0,
  },
];

export default function ShiftProduction() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProductionData[]>(mockData);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <PageLayout title="Shift production">
        <div className="flex items-center justify-center h-64 text-[#6B7280]">
          Loading...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Shift production">
      <div className="max-w-6xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={item.machine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="shopworx-card mb-4"
          >
            {/* Machine Header */}
            <h3 className="text-[16px] font-medium text-[#1F2937] mb-3">
              {item.machine}
            </h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-2 px-3 text-[#6B7280] font-medium">Plan</th>
                    <th className="text-left py-2 px-3 text-[#6B7280] font-medium">Part</th>
                    <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Produced</th>
                    <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Accepted</th>
                    <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Rejected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[#F6F8FB] transition-colors">
                    <td className="py-2 px-3 text-[#1F2937] font-medium">{item.plan}</td>
                    <td className="py-2 px-3 text-[#1F2937]">{item.part}</td>
                    <td className="py-2 px-3 text-right text-[#1F2937] font-medium">
                      {formatNumber(item.produced)}
                    </td>
                    <td className="py-2 px-3 text-right text-[#31B86A] font-medium">
                      {formatNumber(item.accepted)}
                    </td>
                    <td className="py-2 px-3 text-right text-[#EF5350] font-medium">
                      {formatNumber(item.rejected)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}