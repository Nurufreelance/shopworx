import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';
import { useCreateProductionLog, useUpdateProductionLog } from '../hooks/useProductionLogs';

interface ProductionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingLog?: any;
}

const logSchema = z.object({
  machineId: z.string().min(1, 'Machine is required'),
  operator: z.string().min(1, 'Operator name is required'),
  productId: z.string().min(1, 'Product is required'),
  produced: z.number().min(0, 'Produced must be 0 or more'),
  accepted: z.number().min(0, 'Accepted must be 0 or more'),
  rejected: z.number().min(0, 'Rejected must be 0 or more'),
  rework: z.number().min(0, 'Rework must be 0 or more'),
  scrap: z.number().min(0, 'Scrap must be 0 or more'),
  productionTime: z.number().min(1, 'Production time must be at least 1 minute'),
  shift: z.enum(['A', 'B', 'C']),
  notes: z.string().optional(),
}).refine((data) => {
  const total = data.accepted + data.rejected + data.rework + data.scrap;
  return total <= data.produced;
}, {
  message: 'Accepted + Rejected + Rework + Scrap cannot exceed Produced',
  path: ['accepted'],
});

type LogFormData = z.infer<typeof logSchema>;

// Mock data - replace with real data from API
const machines = [
  { id: '1', name: 'LI-43-OM-910' },
  { id: '2', name: 'LI-44-OM-920' },
  { id: '3', name: 'LI-45-OM-930' },
];

const products = [
  { id: '1', name: 'Widget A' },
  { id: '2', name: 'Widget B' },
  { id: '3', name: 'Widget C' },
];

export const ProductionLogModal = ({ isOpen, onClose, editingLog }: ProductionLogModalProps) => {
  const createMutation = useCreateProductionLog();
  const updateMutation = useUpdateProductionLog();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LogFormData>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      machineId: '',
      operator: '',
      productId: '',
      produced: 0,
      accepted: 0,
      rejected: 0,
      rework: 0,
      scrap: 0,
      productionTime: 60,
      shift: 'A',
      notes: '',
    },
  });

  const produced = watch('produced');
  const accepted = watch('accepted');
  const rejected = watch('rejected');
  const rework = watch('rework');
  const scrap = watch('scrap');

  const totalQuality = (accepted || 0) + (rejected || 0) + (rework || 0) + (scrap || 0);
  const efficiency = produced && produced > 0 ? Math.round((accepted || 0) / produced * 100) : 0;

  useEffect(() => {
    if (editingLog) {
      reset({
        machineId: editingLog.machineId,
        operator: editingLog.operator,
        productId: editingLog.productId,
        produced: editingLog.produced,
        accepted: editingLog.accepted,
        rejected: editingLog.rejected,
        rework: editingLog.rework,
        scrap: editingLog.scrap,
        productionTime: editingLog.productionTime,
        shift: editingLog.shift,
        notes: editingLog.notes || '',
      });
    } else {
      reset({
        machineId: '',
        operator: '',
        productId: '',
        produced: 0,
        accepted: 0,
        rejected: 0,
        rework: 0,
        scrap: 0,
        productionTime: 60,
        shift: 'A',
        notes: '',
      });
    }
  }, [editingLog, reset]);

  const onSubmit = async (data: LogFormData) => {
    try {
      if (editingLog) {
        await updateMutation.mutateAsync({ id: editingLog.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
      reset();
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingLog ? 'Edit Production Log' : 'Add Production Log'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Machine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Machine <span className="text-red-500">*</span>
              </label>
              <select
                {...register('machineId')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.machineId ? 'border-red-500' : 'border-gray-300'
                )}
              >
                <option value="">Select Machine</option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
              {errors.machineId && (
                <p className="mt-1 text-sm text-red-600">{errors.machineId.message}</p>
              )}
            </div>

            {/* Operator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operator <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('operator')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.operator ? 'border-red-500' : 'border-gray-300'
                )}
                placeholder="Enter operator name"
              />
              {errors.operator && (
                <p className="mt-1 text-sm text-red-600">{errors.operator.message}</p>
              )}
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                {...register('productId')}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.productId ? 'border-red-500' : 'border-gray-300'
                )}
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {errors.productId && (
                <p className="mt-1 text-sm text-red-600">{errors.productId.message}</p>
              )}
            </div>

            {/* Shift */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift <span className="text-red-500">*</span>
              </label>
              <select
                {...register('shift')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="A">Shift A</option>
                <option value="B">Shift B</option>
                <option value="C">Shift C</option>
              </select>
            </div>
          </div>

          {/* Production Quantities */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Produced <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('produced', { valueAsNumber: true })}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.produced ? 'border-red-500' : 'border-gray-300'
                )}
                min="0"
              />
              {errors.produced && (
                <p className="mt-1 text-sm text-red-600">{errors.produced.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accepted <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('accepted', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rejected <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('rejected', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Production Time (min) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('productionTime', { valueAsNumber: true })}
                className={cn(
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                  errors.productionTime ? 'border-red-500' : 'border-gray-300'
                )}
                min="1"
              />
              {errors.productionTime && (
                <p className="mt-1 text-sm text-red-600">{errors.productionTime.message}</p>
              )}
            </div>
          </div>

          {/* Rework & Scrap */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rework
              </label>
              <input
                type="number"
                {...register('rework', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scrap
              </label>
              <input
                type="number"
                {...register('scrap', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                min="0"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Quality Checked:</span>
                <span className="ml-2 font-medium text-gray-900">{totalQuality}</span>
              </div>
              <div>
                <span className="text-gray-500">Efficiency:</span>
                <span className={cn(
                  "ml-2 font-medium",
                  efficiency >= 95 ? "text-green-600" :
                  efficiency >= 85 ? "text-yellow-600" :
                  "text-red-600"
                )}>
                  {efficiency}%
                </span>
              </div>
              <div>
                <span className="text-gray-500">Rejection Rate:</span>
                <span className="ml-2 font-medium text-red-600">
                  {produced > 0 ? Math.round((rejected || 0) / produced * 100) : 0}%
                </span>
              </div>
              <div>
                <span className="text-gray-500">Acceptance Rate:</span>
                <span className="ml-2 font-medium text-green-600">
                  {produced > 0 ? Math.round((accepted || 0) / produced * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              {...register('notes')}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Optional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : editingLog ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};