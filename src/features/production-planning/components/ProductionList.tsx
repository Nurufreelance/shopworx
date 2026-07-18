import ProductionMachineCard from './ProductionMachineCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductionListProps {
  data: any[];
  loading: boolean;
  onSelectMachine?: (machine: string) => void;
}

const ProductionList = ({ data, loading, onSelectMachine }: ProductionListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-[#6B7280]">
        Loading production data...
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-4">
      <div className="space-y-1">
        <AnimatePresence>
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <ProductionMachineCard 
                data={item} 
                onSelect={() => onSelectMachine?.(item.machineId)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductionList;