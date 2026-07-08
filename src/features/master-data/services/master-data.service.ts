import { api } from '@services/api/axios';
import { getMockData } from './mock-data';
import { EntityType, MasterDataFilters } from '../types/master-data.types';

const USE_MOCK = true;

export class MasterDataService {
  static async getData(type: EntityType, filters?: MasterDataFilters): Promise<any[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      let data = getMockData(type);
      
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        data = data.filter((item: any) =>
          item.name?.toLowerCase().includes(search) ||
          item.code?.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search)
        );
      }
      
      if (filters?.isActive !== undefined) {
        data = data.filter((item: any) => item.isActive === filters.isActive);
      }
      
      if (filters?.status) {
        data = data.filter((item: any) => item.status === filters.status);
      }
      
      if (filters?.category) {
        data = data.filter((item: any) => item.category === filters.category);
      }
      
      if (filters?.department) {
        data = data.filter((item: any) => item.department === filters.department);
      }
      
      return data;
    }
    
    const response = await api.get(`/master-data/${type}`, { params: filters });
    return response.data;
  }

  static async getItem(type: EntityType, id: string): Promise<any> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = getMockData(type);
      const item = data.find((item: any) => item.id === id);
      if (!item) throw new Error('Item not found');
      return item;
    }
    
    const response = await api.get(`/master-data/${type}/${id}`);
    return response.data;
  }

  static async createItem(type: EntityType, data: any): Promise<any> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newItem = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Add to mock data
      const mockData = getMockData(type);
      mockData.unshift(newItem);
      return newItem;
    }
    
    const response = await api.post(`/master-data/${type}`, data);
    return response.data;
  }

  static async updateItem(type: EntityType, id: string, data: any): Promise<any> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = getMockData(type);
      const index = mockData.findIndex((item: any) => item.id === id);
      if (index === -1) throw new Error('Item not found');
      
      mockData[index] = {
        ...mockData[index],
        ...data,
        updatedAt: new Date(),
      };
      return mockData[index];
    }
    
    const response = await api.put(`/master-data/${type}/${id}`, data);
    return response.data;
  }

  static async deleteItem(type: EntityType, id: string): Promise<void> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = getMockData(type);
      const index = mockData.findIndex((item: any) => item.id === id);
      if (index === -1) throw new Error('Item not found');
      mockData.splice(index, 1);
      return;
    }
    
    await api.delete(`/master-data/${type}/${id}`);
  }

  static async toggleStatus(type: EntityType, id: string): Promise<any> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = getMockData(type);
      const index = mockData.findIndex((item: any) => item.id === id);
      if (index === -1) throw new Error('Item not found');
      
      mockData[index].isActive = !mockData[index].isActive;
      mockData[index].updatedAt = new Date();
      return mockData[index];
    }
    
    const response = await api.patch(`/master-data/${type}/${id}/toggle-status`);
    return response.data;
  }
}