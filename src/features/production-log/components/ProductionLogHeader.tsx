import React from 'react';

interface ProductionLogHeaderProps {
  title?: string;
  subtitle?: string;
}

export const ProductionLogHeader: React.FC<ProductionLogHeaderProps> = ({ 
  title = 'Production Log',
  subtitle = 'View and manage production logs'
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
};
