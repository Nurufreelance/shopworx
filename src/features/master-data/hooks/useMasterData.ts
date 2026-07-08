import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { MasterDataService } from '../services/master-data.service';
import { EntityType, MasterDataFilters } from '../types/master-data.types';

export const masterDataKeys = {
  all: ['master-data'] as const,
  lists: (type: EntityType) => [...masterDataKeys.all, type, 'list'] as const,
  list: (type: EntityType, filters: MasterDataFilters) => 
    [...masterDataKeys.lists(type), filters] as const,
  details: (type: EntityType) => [...masterDataKeys.all, type, 'detail'] as const,
  detail: (type: EntityType, id: string) => [...masterDataKeys.details(type), id] as const,
};

export const useMasterData = (type: EntityType, filters?: MasterDataFilters) => {
  return useQuery({
    queryKey: masterDataKeys.list(type, filters || {}),
    queryFn: () => MasterDataService.getData(type, filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateMasterData = (type: EntityType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => MasterDataService.createItem(type, data),
    onSuccess: () => {
      toast.success(`${type.slice(0, -1)} created successfully!`);
      queryClient.invalidateQueries({ queryKey: masterDataKeys.lists(type) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to create ${type.slice(0, -1)}`);
    },
  });
};

export const useUpdateMasterData = (type: EntityType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      MasterDataService.updateItem(type, id, data),
    onSuccess: () => {
      toast.success(`${type.slice(0, -1)} updated successfully!`);
      queryClient.invalidateQueries({ queryKey: masterDataKeys.lists(type) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to update ${type.slice(0, -1)}`);
    },
  });
};

export const useDeleteMasterData = (type: EntityType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MasterDataService.deleteItem(type, id),
    onSuccess: () => {
      toast.success(`${type.slice(0, -1)} deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: masterDataKeys.lists(type) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to delete ${type.slice(0, -1)}`);
    },
  });
};

export const useToggleMasterDataStatus = (type: EntityType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MasterDataService.toggleStatus(type, id),
    onSuccess: () => {
      toast.success('Status updated successfully!');
      queryClient.invalidateQueries({ queryKey: masterDataKeys.lists(type) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    },
  });
};