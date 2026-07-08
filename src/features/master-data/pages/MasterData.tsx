import { useState } from 'react';
import { useMobile } from '@context/MobileContext';
import {
  Cog6ToothIcon,
  CubeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';
import { useMasterData, useCreateMasterData, useUpdateMasterData, useDeleteMasterData, useToggleMasterDataStatus } from '../hooks/useMasterData';
import { MasterDataTable } from '../components/MasterDataTable';
import { MasterDataModal } from '../components/MasterDataModal';
import { EntityType, entityConfigs } from '../types/master-data.types';

const tabs = [
  { id: 'machines', label: 'Machines', icon: Cog6ToothIcon },
  { id: 'products', label: 'Products', icon: CubeIcon },
  { id: 'operators', label: 'Operators', icon: UsersIcon },
  { id: 'plants', label: 'Plants', icon: BuildingOfficeIcon },
  { id: 'shifts', label: 'Shifts', icon: ClockIcon },
  { id: 'reason-codes', label: 'Reason Codes', icon: DocumentTextIcon },
];

const fieldConfigs: Record<string, any[]> = {
  machines: [
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'type', label: 'Type', type: 'select', required: true, options: [
      { value: 'production', label: 'Production' },
      { value: 'assembly', label: 'Assembly' },
      { value: 'packaging', label: 'Packaging' },
      { value: 'quality', label: 'Quality' },
    ]},
    { name: 'model', label: 'Model', type: 'text', required: true },
    { name: 'serialNumber', label: 'Serial Number', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'active', label: 'Active' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'idle', label: 'Idle' },
      { value: 'retired', label: 'Retired' },
    ]},
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  products: [
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'raw', label: 'Raw' },
      { value: 'wip', label: 'WIP' },
      { value: 'finished', label: 'Finished' },
      { value: 'consumable', label: 'Consumable' },
    ]},
    { name: 'unit', label: 'Unit', type: 'select', required: true, options: [
      { value: 'pcs', label: 'Pieces' },
      { value: 'kg', label: 'Kilograms' },
      { value: 'liters', label: 'Liters' },
      { value: 'meters', label: 'Meters' },
      { value: 'hours', label: 'Hours' },
    ]},
    { name: 'weight', label: 'Weight', type: 'number' },
    { name: 'dimensions', label: 'Dimensions', type: 'text' },
    { name: 'material', label: 'Material', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  operators: [
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
    { name: 'department', label: 'Department', type: 'select', required: true, options: [
      { value: 'production', label: 'Production' },
      { value: 'quality', label: 'Quality' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'logistics', label: 'Logistics' },
    ]},
    { name: 'position', label: 'Position', type: 'text', required: true },
    { name: 'shiftPreference', label: 'Shift Preference', type: 'select', options: [
      { value: 'A', label: 'Shift A' },
      { value: 'B', label: 'Shift B' },
      { value: 'C', label: 'Shift C' },
    ]},
    { name: 'contactNumber', label: 'Contact Number', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  plants: [
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'text', required: true },
    { name: 'country', label: 'Country', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'manager', label: 'Manager', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  shifts: [
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'timeStart', label: 'Start Time', type: 'text', required: true },
    { name: 'timeEnd', label: 'End Time', type: 'text', required: true },
    { name: 'maxOperators', label: 'Max Operators', type: 'number', required: true },
    { name: 'supervisors', label: 'Supervisors (comma separated)', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  'reason-codes': [
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'downtime', label: 'Downtime' },
      { value: 'quality', label: 'Quality' },
      { value: 'rejection', label: 'Rejection' },
      { value: 'rework', label: 'Rework' },
      { value: 'scrap', label: 'Scrap' },
    ]},
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' },
    ]},
    { name: 'requiresApproval', label: 'Requires Approval', type: 'boolean' },
    { name: 'responsibleDepartment', label: 'Responsible Department', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
};

export default function MasterData() {
  const [activeTab, setActiveTab] = useState<EntityType>('machines');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [filters, setFilters] = useState({});

  const { data, isLoading, refetch } = useMasterData(activeTab, {
    search: searchTerm || undefined,
    ...filters,
  });

  const createMutation = useCreateMasterData(activeTab);
  const updateMutation = useUpdateMasterData(activeTab);
  const deleteMutation = useDeleteMasterData(activeTab);
  const toggleStatusMutation = useToggleMasterDataStatus(activeTab);

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    ...(activeTab === 'machines' ? [
      { key: 'type', label: 'Type' },
      { key: 'model', label: 'Model' },
      { key: 'status', label: 'Status' },
    ] : []),
    ...(activeTab === 'products' ? [
      { key: 'category', label: 'Category' },
      { key: 'unit', label: 'Unit' },
    ] : []),
    ...(activeTab === 'operators' ? [
      { key: 'department', label: 'Department' },
      { key: 'position', label: 'Position' },
    ] : []),
    ...(activeTab === 'plants' ? [
      { key: 'location', label: 'Location' },
      { key: 'city', label: 'City' },
    ] : []),
    ...(activeTab === 'shifts' ? [
      { key: 'timeStart', label: 'Start' },
      { key: 'timeEnd', label: 'End' },
      { key: 'maxOperators', label: 'Max' },
    ] : []),
    ...(activeTab === 'reason-codes' ? [
      { key: 'category', label: 'Category' },
      { key: 'priority', label: 'Priority' },
    ] : []),
  ];

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatusMutation.mutateAsync(id);
  };

  const handleSubmit = async (data: any) => {
    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const fields = fieldConfigs[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Data</h1>
        <p className="text-sm text-gray-500 mt-1">Manage reference data for the entire system</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as EntityType)}
                className={cn(
                  "flex items-center px-4 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Table */}
      <MasterDataTable
        data={data || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onCreate={handleCreate}
        onSearch={setSearchTerm}
        title={entityConfigs[activeTab]?.label || 'Items'}
        isLoading={isLoading || deleteMutation.isPending}
      />

      {/* Modal */}
      <MasterDataModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        title={`${editingItem ? 'Edit' : 'Create'} ${entityConfigs[activeTab]?.label.slice(0, -1) || 'Item'}`}
        fields={fields}
        editingItem={editingItem}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
