import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ProductionLogService } from '../services/production-log.service';
import { productionLogWs } from '../services/production-log-ws.service';
import { CreateProductionLogDto, ProductionLogFilters } from '../types/production-log.types';
import { useEffect, useState } from 'react';

export const productionLogKeys = {
  all: ['production-logs'] as const,
  lists: () => [...productionLogKeys.all, 'list'] as const,
  list: (filters: ProductionLogFilters) => [...productionLogKeys.lists(), filters] as const,
  details: () => [...productionLogKeys.all, 'detail'] as const,
  detail: (id: string) => [...productionLogKeys.details(), id] as const,
  stats: (filters: ProductionLogFilters) => [...productionLogKeys.all, 'stats', filters] as const,
};

export const useProductionLogs = (filters?: ProductionLogFilters) => {
  const queryClient = useQueryClient();
  const [isLive, setIsLive] = useState(true);

  const query = useQuery({
    queryKey: productionLogKeys.list(filters || {}),
    queryFn: () => ProductionLogService.getLogs(filters),
    staleTime: 30000, // 30 seconds
    refetchInterval: isLive ? 5000 : false, // Poll every 5 seconds if live
  });

  // WebSocket integration
  useEffect(() => {
    // Connect to WebSocket
    productionLogWs.connect();

    // Handle new logs
    const handleNewLog = (data: any) => {
      queryClient.setQueryData(
        productionLogKeys.list(filters || {}),
        (oldData: any) => {
          if (!oldData) return [data];
          return [data, ...oldData];
        }
      );
    };

    // Handle log updates
    const handleLogUpdate = (data: any) => {
      queryClient.setQueryData(
        productionLogKeys.list(filters || {}),
        (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((log: any) => 
            log.id === data.id ? data : log
          );
        }
      );
    };

    productionLogWs.on('new-log', handleNewLog);
    productionLogWs.on('log-update', handleLogUpdate);

    return () => {
      productionLogWs.off('new-log');
      productionLogWs.off('log-update');
      productionLogWs.disconnect();
    };
  }, [queryClient, filters]);

  return {
    ...query,
    isLive,
    setIsLive,
    toggleLive: () => setIsLive(!isLive),
  };
};

export const useProductionLogStats = (filters?: ProductionLogFilters) => {
  return useQuery({
    queryKey: productionLogKeys.stats(filters || {}),
    queryFn: () => ProductionLogService.getStats(filters),
    staleTime: 30000,
    refetchInterval: 10000, // Refresh every 10 seconds
  });
};

export const useCreateProductionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductionLogDto) => 
      ProductionLogService.createLog(data),
    onSuccess: (data) => {
      toast.success('Production log created successfully!');
      queryClient.invalidateQueries({ queryKey: productionLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productionLogKeys.stats({}) });
      
      // Send via WebSocket
      productionLogWs.send({
        type: 'new-log',
        payload: data
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create log');
    },
  });
};

export const useUpdateProductionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductionLogDto> }) =>
      ProductionLogService.updateLog(id, data),
    onSuccess: (data) => {
      toast.success('Production log updated successfully!');
      queryClient.invalidateQueries({ queryKey: productionLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productionLogKeys.stats({}) });
      
      // Send via WebSocket
      productionLogWs.send({
        type: 'log-update',
        payload: data
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update log');
    },
  });
};

export const useDeleteProductionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductionLogService.deleteLog(id),
    onSuccess: () => {
      toast.success('Production log deleted successfully!');
      queryClient.invalidateQueries({ queryKey: productionLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productionLogKeys.stats({}) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete log');
    },
  });
};

export const useExportProductionLogs = () => {
  return useMutation({
    mutationFn: (filters?: ProductionLogFilters) => 
      ProductionLogService.exportLogs(filters),
    onSuccess: (data) => {
      // Create download link
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `production-logs-${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Export completed successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to export logs');
    },
  });
};