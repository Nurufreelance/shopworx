import { useQuery } from '@tanstack/react-query';
import { ProductionPlanningService } from '../services/production-planning.service';

export const useProductionPlans = (filters?: any) => {
  return useQuery({
    queryKey: ['production-plans', filters],
    queryFn: () => ProductionPlanningService.getPlans(filters),
    staleTime: 5 * 60 * 1000,
  });
};
