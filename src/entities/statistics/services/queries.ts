import { useQuery } from "@tanstack/react-query";
import {
  statisticsControllerGetOverview,
  statisticsControllerGetDiseasesChart,
  statisticsControllerGetMonthlyTrends,
  StatisticsControllerGetOverviewParams,
} from "@/shared/api/api-new";
import type { OverviewResponse, DiseasesResponse, TrendsResponse } from "@/shared/types/statistics";

const STATISTICS_KEY = "STATISTICS";

export function useGetStatisticsOverview(params?: StatisticsControllerGetOverviewParams) {
  return useQuery<OverviewResponse, Error>({
    queryKey: [STATISTICS_KEY, "overview", params],
    queryFn: async () => statisticsControllerGetOverview(params) as Promise<OverviewResponse>,
  });
}

export function useGetStatisticsDiseases(params?: StatisticsControllerGetOverviewParams) {
  return useQuery<DiseasesResponse, Error>({
    queryKey: [STATISTICS_KEY, "diseases", params],
    queryFn: async () => statisticsControllerGetDiseasesChart(params) as Promise<DiseasesResponse>,
  });
}

export function useGetStatisticsTrends(params?: StatisticsControllerGetOverviewParams) {
  return useQuery<TrendsResponse, Error>({
    queryKey: [STATISTICS_KEY, "trends", params],
    queryFn: async () => statisticsControllerGetMonthlyTrends(params) as Promise<TrendsResponse>,
  });
}
