import { StatisticsDashboard } from "@/widgets/statistics/statistics-dashboard";

export default function StatisticsPage() {
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-semibold">Статистика</h1>
        <p className="text-sm text-muted-foreground">Обзор сессий и заболеваний</p>
      </div>
      <StatisticsDashboard />
    </div>
  );
}
