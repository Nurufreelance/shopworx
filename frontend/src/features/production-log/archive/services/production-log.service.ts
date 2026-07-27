import { api } from '@services/api/axios';
import { 
  ProductionLogEntry, 
  CreateProductionLogDto, 
  ProductionLogFilters,
  ProductionLogStats 
} from '../types/production-log.types';
import { mockLogs, mockStats } from './mock-data';

// Flag to use mock data (set to false when API is ready)
const USE_MOCK = true;

export class ProductionLogService {
  static async getLogs(filters?: ProductionLogFilters): Promise<ProductionLogEntry[]> {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredLogs = [...mockLogs];
      
      // Apply filters
      if (filters?.machineId) {
        filteredLogs = filteredLogs.filter(log => log.machineId === filters.machineId);
      }
      if (filters?.operator) {
        filteredLogs = filteredLogs.filter(log => 
          log.operator.toLowerCase().includes(filters.operator!.toLowerCase())
        );
      }
      if (filters?.shift) {
        filteredLogs = filteredLogs.filter(log => log.shift === filters.shift);
      }
      if (filters?.dateFrom) {
        filteredLogs = filteredLogs.filter(log => 
          log.timestamp >= filters.dateFrom!
        );
      }
      if (filters?.dateTo) {
        filteredLogs = filteredLogs.filter(log => 
          log.timestamp <= filters.dateTo!
        );
      }
      if (filters?.status) {
        filteredLogs = filteredLogs.filter(log => log.status === filters.status);
      }
      
      // Sort by timestamp descending (newest first)
      return filteredLogs.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
    
    const response = await api.get<ProductionLogEntry[]>('/production/logs', { 
      params: filters 
    });
    return response.data;
  }

  static async getLog(id: string): Promise<ProductionLogEntry> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const log = mockLogs.find(l => l.id === id);
      if (!log) throw new Error('Log not found');
      return log;
    }
    
    const response = await api.get<ProductionLogEntry>(`/production/logs/${id}`);
    return response.data;
  }

  static async createLog(data: CreateProductionLogDto): Promise<ProductionLogEntry> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLog: ProductionLogEntry = {
        id: Date.now().toString(),
        machineId: data.machineId,
        machineName: `Machine ${data.machineId}`,
        operator: data.operator,
        planId: data.planId || `plan-${Date.now()}`,
        productId: data.productId,
        productName: `Product ${data.productId}`,
        produced: data.produced,
        accepted: data.accepted,
        rejected: data.rejected,
        rework: data.rework,
        scrap: data.scrap,
        productionTime: data.productionTime,
        timestamp: new Date(),
        shift: data.shift,
        status: 'running',
        notes: data.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Add to mock data
      mockLogs.unshift(newLog);
      
      return newLog;
    }
    
    const response = await api.post<ProductionLogEntry>('/production/logs', data);
    return response.data;
  }

  static async updateLog(id: string, data: Partial<CreateProductionLogDto>): Promise<ProductionLogEntry> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockLogs.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Log not found');
      
      mockLogs[index] = {
        ...mockLogs[index],
        ...data,
        updatedAt: new Date(),
      };
      
      return mockLogs[index];
    }
    
    const response = await api.put<ProductionLogEntry>(`/production/logs/${id}`, data);
    return response.data;
  }

  static async deleteLog(id: string): Promise<void> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockLogs.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Log not found');
      
      mockLogs.splice(index, 1);
      return;
    }
    
    await api.delete(`/production/logs/${id}`);
  }

  static async getStats(filters?: ProductionLogFilters): Promise<ProductionLogStats> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Calculate stats from mock data
      let filteredLogs = [...mockLogs];
      
      if (filters?.machineId) {
        filteredLogs = filteredLogs.filter(log => log.machineId === filters.machineId);
      }
      if (filters?.shift) {
        filteredLogs = filteredLogs.filter(log => log.shift === filters.shift);
      }
      if (filters?.dateFrom) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.dateFrom!);
      }
      if (filters?.dateTo) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.dateTo!);
      }
      
      const totalProduced = filteredLogs.reduce((sum, log) => sum + log.produced, 0);
      const totalAccepted = filteredLogs.reduce((sum, log) => sum + log.accepted, 0);
      const totalRejected = filteredLogs.reduce((sum, log) => sum + log.rejected, 0);
      const totalRework = filteredLogs.reduce((sum, log) => sum + log.rework, 0);
      const totalScrap = filteredLogs.reduce((sum, log) => sum + log.scrap, 0);
      
      const uniqueMachines = new Set(filteredLogs.map(log => log.machineId));
      const uniqueOperators = new Set(filteredLogs.map(log => log.operator));
      
      return {
        totalProduced,
        totalAccepted,
        totalRejected,
        totalRework,
        totalScrap,
        acceptanceRate: totalProduced > 0 ? Math.round((totalAccepted / totalProduced) * 100 * 10) / 10 : 0,
        rejectionRate: totalProduced > 0 ? Math.round((totalRejected / totalProduced) * 100 * 10) / 10 : 0,
        efficiency: totalProduced > 0 ? Math.round((totalAccepted / totalProduced) * 100 * 10) / 10 : 0,
        activeMachines: uniqueMachines.size,
        totalOperators: uniqueOperators.size,
      };
    }
    
    const response = await api.get<ProductionLogStats>('/production/logs/stats', { 
      params: filters 
    });
    return response.data;
  }

  static async exportLogs(filters?: ProductionLogFilters): Promise<Blob> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create CSV mock data
      const headers = 'ID,Machine,Operator,Product,Produced,Accepted,Rejected,Rework,Scrap,Time,Shift,Status\n';
      const rows = mockLogs.map(log => 
        `${log.id},${log.machineName},${log.operator},${log.productName},${log.produced},${log.accepted},${log.rejected},${log.rework},${log.scrap},${log.productionTime},${log.shift},${log.status}`
      ).join('\n');
      
      const csv = headers + rows;
      return new Blob([csv], { type: 'text/csv' });
    }
    
    const response = await api.get('/production/logs/export', { 
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  }
}