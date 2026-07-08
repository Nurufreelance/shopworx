import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';
import { BarChart } from '@components/ui/Chart/BarChart';
import { 
  useProductionReport, 
  useDowntimeReport, 
  useQualityReport, 
  usePerformanceReport 
} from '../hooks/useReports';
import { ReportFilter } from '../types/reports.types';

// Column definitions for each report type
const productionColumns: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'hour', headerName: 'Hour', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'department', headerName: 'Department', flex: 0.8 },
  { field: 'category', headerName: 'Category', flex: 0.8 },
  { field: 'production', headerName: 'Production', width: 100 },
  { field: 'target', headerName: 'Target', width: 100 },
  { field: 'efficiency', headerName: 'Efficiency', width: 100 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
  { field: 'shift', headerName: 'Shift', width: 80 },
  { field: 'part', headerName: 'Part', flex: 0.8 },
  { field: 'plan', headerName: 'Plan', flex: 0.8 },
];

const downtimeColumns: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'hour', headerName: 'Hour', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'department', headerName: 'Department', flex: 0.8 },
  { field: 'category', headerName: 'Category', flex: 0.8 },
  { field: 'reason', headerName: 'Downtime Reason', flex: 1.2 },
  { field: 'reasonCode', headerName: 'Reason Code', width: 100 },
  { field: 'duration', headerName: 'Duration (min)', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 80 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
];

const qualityColumns: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'hour', headerName: 'Hour', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
  { field: 'part', headerName: 'Part', flex: 1 },
  { field: 'plan', headerName: 'Plan', flex: 0.8 },
  { field: 'produced', headerName: 'Produced', width: 100 },
  { field: 'accepted', headerName: 'Accepted', width: 100 },
  { field: 'rejected', headerName: 'Rejected', width: 100 },
  { field: 'defectRate', headerName: 'Defect Rate', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 80 },
];

const performanceColumns: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'shift', headerName: 'Shift', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
  { field: 'operatorCode', headerName: 'Op Code', width: 100 },
  { field: 'plan', headerName: 'Plan', flex: 0.8 },
  { field: 'part', headerName: 'Part', flex: 0.8 },
  { field: 'efficiency', headerName: 'Efficiency', width: 100 },
  { field: 'runtime', headerName: 'Runtime (min)', width: 100 },
  { field: 'delay', headerName: 'Delay (min)', width: 100 },
  { field: 'reject', headerName: 'Reject', width: 100 },
];

type ReportTab = 'production' | 'downtime' | 'quality' | 'performance';

export default function Reports() {
  const [activeTab, setActiveTab] = useState<ReportTab>('production');
  const [filters, setFilters] = useState<ReportFilter>({
    interval: 'hourly',
    shift: 'all',
  });

  // Fetch data based on active tab
  const productionReport = useProductionReport({ ...filters, interval: filters.interval || 'hourly' });
  const downtimeReport = useDowntimeReport({ ...filters, interval: filters.interval || 'hourly' });
  const qualityReport = useQualityReport({ ...filters, interval: filters.interval || 'hourly' });
  const performanceReport = usePerformanceReport({ ...filters, interval: filters.interval || 'hourly' });

  const getActiveData = () => {
    switch (activeTab) {
      case 'production': return productionReport.data;
      case 'downtime': return downtimeReport.data;
      case 'quality': return qualityReport.data;
      case 'performance': return performanceReport.data;
      default: return null;
    }
  };

  const getColumns = () => {
    switch (activeTab) {
      case 'production': return productionColumns;
      case 'downtime': return downtimeColumns;
      case 'quality': return qualityColumns;
      case 'performance': return performanceColumns;
      default: return productionColumns;
    }
  };

  const getChartTitle = () => {
    switch (activeTab) {
      case 'production': return 'Production vs Target';
      case 'downtime': return 'Downtime by Category';
      case 'quality': return 'Accepted vs Rejected';
      case 'performance': return 'Runtime, Delay & Reject';
      default: return '';
    }
  };

  const data = getActiveData();
  const columns = getColumns();
  const isLoading = 
    productionReport.isLoading || 
    downtimeReport.isLoading || 
    qualityReport.isLoading || 
    performanceReport.isLoading;

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleRefresh = () => {
    switch (activeTab) {
      case 'production': productionReport.refetch(); break;
      case 'downtime': downtimeReport.refetch(); break;
      case 'quality': qualityReport.refetch(); break;
      case 'performance': performanceReport.refetch(); break;
    }
  };

  const handleExport = () => {
    console.log('Export:', activeTab);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const handleAdd = () => {
    console.log('Add:', activeTab);
  };

  const tabs = [
    { id: 'production', label: 'Production' },
    { id: 'downtime', label: 'Downtime' },
    { id: 'quality', label: 'Quality' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <PageLayout
      title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reports`}
      onSearch={handleSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onAdd={handleAdd}
      onFilter={handleFilter}
      searchPlaceholder={`Search ${activeTab} reports...`}
    >
      {/* Report Tabs */}
      <div className="border-b border-[#E5E7EB] mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReportTab)}
              className={`
                py-2 px-1 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id 
                  ? 'border-[#F97316] text-[#F97316]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-50 border border-[#E5E7EB] rounded p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Interval:</span>
          <select
            value={filters.interval}
            onChange={(e) => setFilters({ ...filters, interval: e.target.value as any })}
            className="px-2 py-1 text-sm border border-[#E5E7EB] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="shift">Shift</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Shift:</span>
          <select
            value={filters.shift}
            onChange={(e) => setFilters({ ...filters, shift: e.target.value as any })}
            className="px-2 py-1 text-sm border border-[#E5E7EB] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
          >
            <option value="all">All</option>
            <option value="A">Shift A</option>
            <option value="B">Shift B</option>
            <option value="C">Shift C</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Date:</span>
          <input
            type="date"
            className="px-2 py-1 text-sm border border-[#E5E7EB] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            className="px-2 py-1 text-sm border border-[#E5E7EB] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#F97316]"
          />
        </div>

        <button className="px-3 py-1 text-sm text-gray-600 border border-[#E5E7EB] rounded hover:bg-gray-100 transition-colors ml-auto">
          Hide Chart
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#F97316] border-t-transparent"></div>
        </div>
      ) : data ? (
        <>
          {/* Chart */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">{getChartTitle()}</h2>
              {activeTab === 'production' && 'summary' in data && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">Efficiency: <span className="font-medium text-gray-700">{data.summary.efficiency}%</span></span>
                  <span className="text-xs text-gray-500">Total: <span className="font-medium text-gray-700">{data.summary.totalProduced}</span></span>
                </div>
              )}
              {activeTab === 'downtime' && 'summary' in data && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">Total: <span className="font-medium text-gray-700">{data.summary.totalDowntime} min</span></span>
                  <span className="text-xs text-gray-500">Events: <span className="font-medium text-gray-700">{data.summary.totalEvents}</span></span>
                </div>
              )}
              {activeTab === 'quality' && 'summary' in data && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">Defect Rate: <span className="font-medium text-gray-700">{data.summary.defectRate}%</span></span>
                  <span className="text-xs text-gray-500">Total: <span className="font-medium text-gray-700">{data.summary.totalInspected}</span></span>
                </div>
              )}
              {activeTab === 'performance' && 'summary' in data && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">Avg Efficiency: <span className="font-medium text-gray-700">{data.summary.avgEfficiency}%</span></span>
                </div>
              )}
            </div>

            {activeTab === 'production' && 'chartData' in data && (
              <BarChart
                data={data.chartData.labels.map((label, index) => ({
                  label,
                  value: data.chartData.produced[index],
                  color: '#3B82F6',
                }))}
                height={250}
              />
            )}

            {activeTab === 'downtime' && 'chartData' in data && (
              <BarChart
                data={data.chartData.labels.map((label, index) => ({
                  label,
                  value: data.chartData.values[index],
                  color: data.chartData.colors[index],
                }))}
                height={250}
              />
            )}

            {activeTab === 'quality' && 'chartData' in data && (
              <BarChart
                data={data.chartData.labels.map((label, index) => ({
                  label,
                  value: data.chartData.accepted[index] + data.chartData.rejected[index],
                  color: data.chartData.rejected[index] > data.chartData.accepted[index] * 0.1 ? '#EF4444' : '#3B82F6',
                }))}
                height={250}
              />
            )}

            {activeTab === 'performance' && 'chartData' in data && (
              <BarChart
                data={data.chartData.labels.map((label, index) => ({
                  label,
                  value: data.chartData.runtime[index],
                  color: '#3B82F6',
                }))}
                height={250}
              />
            )}
          </div>

          {/* Table */}
          <DataGrid
            data={data.tableData || []}
            columns={columns}
            height={400}
            pagination={true}
            pageSize={20}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      )}
    </PageLayout>
  );
}