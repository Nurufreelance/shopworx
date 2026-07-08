import { ReactNode } from 'react';
import { cn } from '@utils/cn';

interface ToastProps {
  children: ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  className?: string;
}

export const Toast = ({ children, type = 'info', onClose, className }: ToastProps) => {
  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-lg text-white shadow-lg',
        types[type],
        className
      )}
    >
      <span>{children}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 hover:opacity-75">
          ✕
        </button>
      )}
    </div>
  );
};
