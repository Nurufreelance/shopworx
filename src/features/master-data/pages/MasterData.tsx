import { useState, useRef, useCallback, useMemo } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { ColDef, GridApi, IRowNode } from 'ag-grid-community';

// ==================== TYPES ====================
interface MasterDataItem {
  id: number;
  code: string;
  name: string;
  department: string;
  category: string;
}

// ==================== LEFT NAVIGATION ====================
function MasterDataNav({ activeItem, onItemClick }: { activeItem: string; onItemClick: (id: string) => void }) {
  const items = [
    { id: 'downtime-reasons', label: 'Downtime reasons' },
    { id: 'rejection-reasons', label: 'Rejection reasons' },
    { id: 'rework-reasons', label: 'Rework reasons' },
    { id: 'scrap-reasons', label: 'Scrap reasons' },
    { id: 'asset', label: 'ASSET' },
    { id: 'colors', label: 'Colors' },
    { id: 'machine', label: 'Machine' },
    { id: 'mold', label: 'Mold' },
    { id: 'part', label: 'Part' },
    { id: 'part-matrix', label: 'Part matrix' },
  ];

  return (
    <div className="w-[270px] bg-[#F8F9FB] border-r border-[#E5E7EB] flex flex-col flex-shrink-0 h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Master Data</h3>
        <nav className="space-y-0.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-[4px] text-[13px] transition-colors ${
                activeItem === item.id
                  ? 'bg-[#E3E5F7] text-[#1A1F36] font-medium'
                  : 'text-[#333] hover:bg-[#E5E7EB]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ==================== ADD MODAL ====================
function AddModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: '',
    category: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ code: '', name: '', department: '', category: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[8px] w-[500px] max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-[16px] font-semibold text-[#222]">Add New Reason</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F6F8FB] rounded-[4px] transition-colors">
            <XMarkIcon className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Reason code*</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
              placeholder="Enter reason code"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Reason name*</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
              placeholder="Enter reason name"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Department*</label>
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            >
              <option value="">Select Department</option>
              <option value="Production">Production</option>
              <option value="Maintenance">Maintenance</option>
              <option value="HR">HR</option>
              <option value="Mixing">Mixing</option>
              <option value="ToolRoom">ToolRoom</option>
              <option value="PPM">PPM</option>
              <option value="Quality">Quality</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Category*</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            >
              <option value="">Select Category</option>
              <option value="PRD">PRD</option>
              <option value="MNT">MNT</option>
              <option value="HR">HR</option>
              <option value="STR">STR</option>
              <option value="TLR">TLR</option>
              <option value="PPM">PPM</option>
              <option value="QTY">QTY</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#6B7280] hover:bg-[#F6F8FB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#3F51B5] text-white rounded-[4px] text-[13px] font-medium hover:bg-[#33408F] transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== EDIT MODAL ====================
function EditModal({ isOpen, onClose, onSave, item }: any) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: '',
    category: '',
  });

  useState(() => {
    if (item) {
      setFormData({
        code: item.code,
        name: item.name,
        department: item.department,
        category: item.category,
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...item, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[8px] w-[500px] max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-[16px] font-semibold text-[#222]">Edit Reason</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F6F8FB] rounded-[4px] transition-colors">
            <XMarkIcon className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Reason code*</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Reason name*</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Department*</label>
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            >
              <option value="Production">Production</option>
              <option value="Maintenance">Maintenance</option>
              <option value="HR">HR</option>
              <option value="Mixing">Mixing</option>
              <option value="ToolRoom">ToolRoom</option>
              <option value="PPM">PPM</option>
              <option value="Quality">Quality</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1">Category*</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            >
              <option value="PRD">PRD</option>
              <option value="MNT">MNT</option>
              <option value="HR">HR</option>
              <option value="STR">STR</option>
              <option value="TLR">TLR</option>
              <option value="PPM">PPM</option>
              <option value="QTY">QTY</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#6B7280] hover:bg-[#F6F8FB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#3F51B5] text-white rounded-[4px] text-[13px] font-medium hover:bg-[#33408F] transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== DELETE CONFIRMATION ====================
function DeleteModal({ isOpen, onClose, onConfirm, item }: any) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[8px] w-[400px] shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-[16px] font-semibold text-[#222]">Confirm Delete</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F6F8FB] rounded-[4px] transition-colors">
            <XMarkIcon className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-[14px] text-[#333]">
            Are you sure you want to delete <strong>"{item.name}"</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#6B7280] hover:bg-[#F6F8FB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 bg-[#EF4444] text-white rounded-[4px] text-[13px] font-medium hover:bg-[#DC2626] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== EXPORT DROPDOWN ====================
function ExportDropdown({ isOpen, onClose, onExport }: any) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 w-[180px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg py-1 z-50">
      <button
        onClick={() => { onExport('csv'); onClose(); }}
        className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F6F8FB] transition-colors"
      >
        <ArrowDownTrayIcon className="w-4 h-4 inline mr-2" />
        Export as CSV
      </button>
      <button
        onClick={() => { onExport('excel'); onClose(); }}
        className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F6F8FB] transition-colors"
      >
        <ArrowDownTrayIcon className="w-4 h-4 inline mr-2" />
        Export as Excel
      </button>
      <button
        onClick={() => { onExport('pdf'); onClose(); }}
        className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F6F8FB] transition-colors"
      >
        <ArrowDownTrayIcon className="w-4 h-4 inline mr-2" />
        Export as PDF
      </button>
    </div>
  );
}

// ==================== IMPORT DIALOG ====================
function ImportDialog({ isOpen, onClose, onImport }: any) {
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onImport(file);
      setFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[8px] w-[450px] shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-[16px] font-semibold text-[#222]">Import Data</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F6F8FB] rounded-[4px] transition-colors">
            <XMarkIcon className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="border-2 border-dashed border-[#D8D8D8] rounded-[8px] p-8 text-center">
            <CloudArrowUpIcon className="w-12 h-12 mx-auto text-[#9CA3AF]" />
            <p className="mt-2 text-[13px] text-[#6B7280]">Drop your CSV file here or click to browse</p>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-3 block w-full text-[13px] text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-[4px] file:border-0 file:text-[13px] file:bg-[#3F51B5] file:text-white hover:file:bg-[#33408F]"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#6B7280] hover:bg-[#F6F8FB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file}
              className="px-4 py-2 bg-[#3F51B5] text-white rounded-[4px] text-[13px] font-medium hover:bg-[#33408F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function MasterData() {
  const [activeItem, setActiveItem] = useState('downtime-reasons');
  const [searchTerm, setSearchTerm] = useState('');
  const gridApiRef = useRef<GridApi | null>(null);
  
  // Data matching screenshot (RJ codes)
  const [data, setData] = useState<MasterDataItem[]>([
    { id: 1, code: 'RJ11', name: 'Warpage/Shrinkage', department: 'PRD', category: 'PRD' },
    { id: 2, code: 'RJ10', name: 'Water Mark', department: 'PRD', category: 'PRD' },
    { id: 3, code: 'RJ09', name: 'Pin Hole', department: 'PRD', category: 'PRD' },
    { id: 4, code: 'RJ08', name: 'Flash', department: 'PRD', category: 'PRD' },
    { id: 5, code: 'RJ07', name: 'Burning Mark', department: 'PRD', category: 'PRD' },
    { id: 6, code: 'RJ06', name: 'Part Breaking', department: 'PRD', category: 'PRD' },
    { id: 7, code: 'RJ05', name: 'Startup Rejections', department: 'PRD', category: 'PRD' },
    { id: 8, code: 'RJ04', name: 'Fitment', department: 'PRD', category: 'PRD' },
    { id: 9, code: 'RJ03', name: 'Color Matching', department: 'MAT', category: 'MAT' },
    { id: 10, code: 'RJ02', name: 'Color Change', department: 'PRD', category: 'PRD' },
    { id: 11, code: 'RJ01', name: 'Short Molding', department: 'PRD', category: 'PRD' },
    { id: 12, code: 'RJ00', name: 'Sample Reason', department: 'PRD', category: 'PRD' },
    { id: 13, code: 'RJ99', name: 'Another Reason', department: 'MNT', category: 'MNT' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterDataItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MasterDataItem | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Filter data based on search
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // ===== AG Grid Column Definitions =====
  const columnDefs: ColDef[] = [
    {
      field: 'code',
      headerName: 'Reason code*',
      width: 140,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    },
    {
      field: 'name',
      headerName: 'Reason name*',
      width: 250,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    },
    {
      field: 'department',
      headerName: 'Department*',
      width: 180,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    },
    {
      field: 'category',
      headerName: 'Category*',
      width: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    },
  ];

  // ===== AG Grid Row Selection =====
  const onGridReady = useCallback((params: any) => {
    gridApiRef.current = params.api;
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridApiRef.current?.getSelectedNodes() || [];
    console.log('Selected rows:', selectedNodes.length);
  }, []);

  // ===== CRUD Operations =====
  const handleAdd = (formData: any) => {
    const newItem: MasterDataItem = {
      id: Math.max(...data.map(d => d.id)) + 1,
      code: formData.code,
      name: formData.name,
      department: formData.department,
      category: formData.category,
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: MasterDataItem) => {
    setData(data.map(d => d.id === item.id ? item : d));
  };

  const handleDelete = (id: number) => {
    setData(data.filter(d => d.id !== id));
  };

  const handleBulkDelete = () => {
    const selectedNodes = gridApiRef.current?.getSelectedNodes() || [];
    const selectedIds = selectedNodes.map((node: IRowNode) => node.data.id);
    setData(data.filter(d => !selectedIds.includes(d.id)));
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}...`, filteredData);
    alert(`Exporting ${filteredData.length} rows as ${format.toUpperCase()}`);
  };

  const handleImport = (file: File) => {
    console.log('Importing file:', file.name);
    alert(`Importing ${file.name}... (mock)`);
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
    alert('Data refreshed! (mock)');
  };

  const handleDownloadSample = () => {
    const sampleData = 'code,name,department,category\nRJ11,Warpage/Shrinkage,PRD,PRD\nRJ10,Water Mark,PRD,PRD';
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_master_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Close export dropdown on outside click
  useState(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-full bg-white">
      {/* Left Navigation */}
      <MasterDataNav activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        {/* Header - Master Data */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[20px] font-semibold text-[#1A1F36]">Master Data</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports & insights"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[280px] pl-10 pr-4 py-1.5 border border-[#E5E7EB] rounded-full text-[13px] bg-[#F8F9FB] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2 w-4 h-4 text-[#9CA3AF]" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3F51B5] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#33408F] transition-colors h-[34px]"
            >
              <PlusIcon className="w-4 h-4" />
              Add New
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3F51B5] text-[#3F51B5] text-[13px] font-medium rounded-[4px] hover:bg-[#F6F8FB] transition-colors h-[34px]"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Refresh
            </button>
            <div className="relative" ref={exportRef}>
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3F51B5] text-[#3F51B5] text-[13px] font-medium rounded-[4px] hover:bg-[#F6F8FB] transition-colors h-[34px]"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export
                <ChevronDownIcon className="w-3 h-3 ml-1" />
              </button>
              <ExportDropdown
                isOpen={showExportDropdown}
                onClose={() => setShowExportDropdown(false)}
                onExport={handleExport}
              />
            </div>
            <button
              onClick={handleDownloadSample}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3F51B5] text-[#3F51B5] text-[13px] font-medium rounded-[4px] hover:bg-[#F6F8FB] transition-colors h-[34px]"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Download Sample CSV
            </button>
            <button
              onClick={() => setShowImportDialog(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3F51B5] text-[#3F51B5] text-[13px] font-medium rounded-[4px] hover:bg-[#F6F8FB] transition-colors h-[34px]"
            >
              <CloudArrowUpIcon className="w-4 h-4" />
              Import
            </button>
            {/* Bulk Delete - Only show when rows selected */}
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500 text-red-500 text-[13px] font-medium rounded-[4px] hover:bg-red-50 transition-colors h-[34px] ml-2"
            >
              Delete Selected
            </button>
          </div>
        </div>

        {/* AG Grid Table */}
        <div className="flex-1 border border-[#E5E7EB] rounded-[4px] ag-theme-alpine" style={{ height: 'calc(100% - 60px)' }}>
          <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            enableCellTextSelection={true}
            ensureDomOrder={true}
            rowHeight={38}
            headerHeight={48}
            pagination={false}
            animateRows={true}
            defaultColDef={{
              flex: 0,
              minWidth: 120,
            }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E5E7EB] text-[13px] text-[#6B7280] h-[40px]">
          <span>Rows: {filteredData.length}</span>
        </div>
      </div>

      {/* ===== MODALS ===== */}
      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAdd}
      />

      <EditModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingItem(null); }}
        onSave={handleEdit}
        item={editingItem}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeletingItem(null); }}
        onConfirm={() => deletingItem && handleDelete(deletingItem.id)}
        item={deletingItem}
      />

      <ImportDialog
        isOpen={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        onImport={handleImport}
      />
    </div>
  );
}