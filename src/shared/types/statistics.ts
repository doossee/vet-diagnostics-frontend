export interface DiseaseStatItem {
  diseaseIndex: string;
  diseaseName: string;
  count: number;
}

export interface DiseasesResponse {
  data: DiseaseStatItem[];
  totalSessionsAnalyzed: number;
}

export interface OverviewResponse {
  totalSessions: number;
  submittedSessions: number;
  draftSessions: number;
  readySessions: number;
  totalAnimalsExamined: number;
  mostCommonDisease: DiseaseStatItem | null;
}

export interface MonthlyTrendItem {
  period: string;
  total: number;
  diseases: DiseaseStatItem[];
}

export interface TrendsResponse {
  data: MonthlyTrendItem[];
}

export interface StatisticsQuery {
  animalTypeId?: string;
  startDate?: string;
  endDate?: string;
}
