import React from 'react';

interface ProductionLog {
  id: string;
  machineName: string;
  shift: string;
  partName: string;
  planned: number;
  produced: number;
  accepted: number;
  rejected: number;
  status: string;
}

interface ProductionTableProps {
  logs: ProductionLog[];
  loading?: boolean;
}

export const ProductionTable: React.FC<ProductionTableProps> = ({ logs, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Running':
        return 'bg-green-100 text-green-600';
      case 'Stopped':
        return 'bg-red-100 text-red-600';
      case 'Idle':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produced</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accepted</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{log.machineName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.shift}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.partName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.planned}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.produced}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.accepted}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.rejected}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={'px-2 py-1 text-xs font-medium rounded-full ' + getStatusStyles(log.status)}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                No production logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
