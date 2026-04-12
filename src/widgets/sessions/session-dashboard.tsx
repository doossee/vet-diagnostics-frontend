"use client";

import { Brain, ExternalLink } from "lucide-react";
import { Link } from "@/shared/i18n/routing";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { BloodExamInfoTable } from "@/features/animals/components/info-tables/blood-exam-info-table";
import { ClinicExamInfoTable } from "@/features/animals/components/info-tables/clinic-exam-info-table";
import { UrineExamInfoTable } from "@/features/animals/components/info-tables/urine-exam-info-table";
import { FecesExamInfoTable } from "@/features/animals/components/info-tables/feces-examp-info-table";
import { useGetMedicalSessionById } from "@/entities/sessions/services/queries";
import { MucosaExamsTable } from "../mucosa-exams/mucosa-exams-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { PREDICT_DISEASES } from "@/shared/constants";
import { routes } from "@/shared/constants/routes";
import { useI18n } from "@/shared/hooks/use-i18n";

type SeverityLevel = { label: string; badgeClass: string; barClass: string; borderClass: string; bgClass: string };

function getSeverity(percent: number): SeverityLevel {
  if (percent >= 70) return { label: "Критический", badgeClass: "bg-red-100 text-red-700 border-red-300", barClass: "[&>div]:bg-red-500", borderClass: "border-red-200", bgClass: "bg-red-50 dark:bg-red-950/20" };
  if (percent >= 50) return { label: "Высокий", badgeClass: "bg-orange-100 text-orange-700 border-orange-300", barClass: "[&>div]:bg-orange-500", borderClass: "border-orange-200", bgClass: "bg-orange-50 dark:bg-orange-950/20" };
  if (percent >= 30) return { label: "Средний", badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-300", barClass: "[&>div]:bg-yellow-500", borderClass: "border-yellow-200", bgClass: "bg-yellow-50 dark:bg-yellow-950/20" };
  if (percent >= 10) return { label: "Умеренный", badgeClass: "bg-blue-100 text-blue-700 border-blue-300", barClass: "[&>div]:bg-blue-500", borderClass: "border-blue-200", bgClass: "bg-blue-50 dark:bg-blue-950/20" };
  return { label: "Низкий", badgeClass: "bg-green-100 text-green-700 border-green-300", barClass: "[&>div]:bg-green-500", borderClass: "border-green-200", bgClass: "bg-green-50 dark:bg-green-950/20" };
}

function getAlertSeverityInfo(alerts: import("@/shared/types").AnomalyAlert[]) {
  const counts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  alerts.forEach(a => { if (a.severity in counts) counts[a.severity]++; });
  return counts;
}

function PredictSummaryCard({ sessionId, prediction, anomalyAlerts, isLoading }: {
  sessionId: string;
  prediction?: { rawOutput: Record<string, number> } | null;
  anomalyAlerts?: import("@/shared/types").AnomalyAlert[];
  isLoading?: boolean;
}) {
  const { locale } = useI18n();

  if (isLoading) {
    return (
      <Card className="shadow-none rounded col-span-1 md:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <Brain className="size-5 md:size-6" />
              AI Прогноз
            </CardTitle>
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="space-y-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-4 w-10 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="shadow-none rounded col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <Brain className="size-5 md:size-6" />
            AI Прогноз
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Прогноз ещё не сформирован. Отправьте сессию для получения результата.</p>
        </CardContent>
      </Card>
    );
  }

  const top5 = Object.entries(prediction.rawOutput)
    .filter(([key]) => !!PREDICT_DISEASES[key])
    .map(([key, value]) => ({
      key,
      name: PREDICT_DISEASES[key]?.[locale] ?? `#${key}`,
      percent: Math.round(value * 100),
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  const top = top5[0];
  const topSeverity = getSeverity(top?.percent ?? 0);
  const alertCounts = getAlertSeverityInfo(anomalyAlerts ?? []);
  const totalAlerts = (anomalyAlerts ?? []).filter(a => a.status !== "RESOLVED").length;

  return (
    <Card className="shadow-none rounded col-span-1 md:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <Brain className="size-5 md:size-6" />
            AI Прогноз
          </CardTitle>
          <Link href={routes.SESSIONS.PREDICT(sessionId)}>
            <Button size="sm">
              <ExternalLink className="size-4" />
              Подробнее
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Top disease highlight */}
        {top && (
          <div className={`rounded-lg border ${topSeverity.borderClass} ${topSeverity.bgClass} px-4 py-3`}>
            <p className="text-xs text-muted-foreground mb-1">Наиболее вероятный диагноз</p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-base leading-tight">{top.name}</span>
              <Badge variant="outline" className={`text-xs font-semibold px-2 py-0.5 ${topSeverity.badgeClass}`}>
                {top.percent}% — {topSeverity.label}
              </Badge>
            </div>
          </div>
        )}

        {/* Top 5 disease bars */}
        <div className="space-y-2.5">
          {top5.map((item, idx) => {
            const sev = getSeverity(item.percent);
            return (
              <div key={item.key}>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs text-muted-foreground shrink-0 w-4 text-right">{idx + 1}.</span>
                    <span className="text-sm truncate">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold shrink-0 tabular-nums">{item.percent}%</span>
                </div>
                <Progress value={item.percent} className="h-2" />
              </div>
            );
          })}
        </div>

        {/* Anomaly alerts summary */}
        {totalAlerts > 0 && (
          <div className="rounded-lg border bg-muted/30 px-3 py-2.5">
            <p className="text-xs text-muted-foreground mb-2">Обнаруженные аномалии</p>
            <div className="flex gap-3 flex-wrap">
              {alertCounts.CRITICAL > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-xs font-medium text-red-700">{alertCounts.CRITICAL} критических</span>
                </div>
              )}
              {alertCounts.HIGH > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-xs font-medium text-orange-700">{alertCounts.HIGH} высоких</span>
                </div>
              )}
              {alertCounts.MEDIUM > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-yellow-500 shrink-0" />
                  <span className="text-xs font-medium text-yellow-700">{alertCounts.MEDIUM} средних</span>
                </div>
              )}
              {alertCounts.LOW > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-xs font-medium text-blue-700">{alertCounts.LOW} низких</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SessionDashboard({ id }: { id: string }) {
  const { setMany } = useSearchQueryParams();
  const { data, isLoading } = useGetMedicalSessionById(id);

  const handleOpenRoute = (route: string, isNew?: boolean) => {
    if(!data?.animal) return

    const { id: animalId, animalTypeId } = data?.animal

    const payload = {
      animalId,
      new: isNew,
      animalTypeId,

      ...(isNew && {sessionId: id}),
    }

    setMany(payload, route)
  }

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PredictSummaryCard sessionId={id} prediction={data?.prediction} anomalyAlerts={data?.anomalyAlerts} isLoading={isLoading} />

        <FecesExamInfoTable data={data?.fecesExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <UrineExamInfoTable data={data?.urineExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <ClinicExamInfoTable data={data?.clinicalExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <BloodExamInfoTable data={data?.bloodExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <MucosaExamsTable animalId={data?.animalId} sessionId={data?.id} className="col-span-1 md:col-span-2 lg:col-span-3" />
      </div>
    </div>
  );
}
