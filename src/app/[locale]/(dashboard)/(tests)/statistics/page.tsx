import { getTranslations } from "next-intl/server";
import { StatisticsDashboard } from "@/widgets/statistics/statistics-dashboard";

export default async function StatisticsPage() {
  const t = await getTranslations();
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-xl font-semibold">{t("statistics.pageTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("statistics.pageDesc")}</p>
      </div>
      <StatisticsDashboard />
    </div>
  );
}
