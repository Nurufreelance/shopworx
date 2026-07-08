import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number' | 'date' | 'boolean';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface MasterDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  fields: Field[];
  editingItem?: any;
  isLoading?: boolean;
}

export const MasterDataModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  editingItem,
  isLoading = false,
}: MasterDataModalProps) => {
  // Build schema dynamically
  const schema = z.object(
    fields.reduce((acc, field) => {
      let validator = z.any();
      if (field.type === 'number') {
        validator = z.number({ message: 'Must be a number' });
      } else if (field.type === 'date') {
        validator = z.date({ message: 'Invalid date' });
      } else if (field.type === 'boolean') {
        validator = z.boolean();
      } else {
        validator = z.string();
      }
      if (field.required) {
        validator = field.type === 'number' 
          ? validator.min(0, 'Required')
          : validator.min(1, 'Required');
      }
      acc[field.name] = validator;
      return acc;
    }, {} as Record<string, any>)
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (editingItem) {
      Object.keys(editingItem).forEach((key) => {
        setValue(key, editingItem[key]);
      });
    }
  }, [editingItem, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  {...register(field.name)}
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  )}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  {...register(field.name)}
                  rows={3}
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  )}
                  placeholder={field.placeholder}
                />
              ) : field.type === 'boolean' ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register(field.name)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Active</span>
                </div>
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  {...register(field.name, field.type === 'number' ? { valueAsNumber: true } : {})}
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none',
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  )}
                  placeholder={field.placeholder}
                  step={field.type === 'number' ? 'any' : undefined}
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

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
              disabled={isLoading || isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};