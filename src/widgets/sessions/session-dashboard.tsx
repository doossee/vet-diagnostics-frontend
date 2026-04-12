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
import { PREDICT_DISEASES } from "@/shared/constants";
import { routes } from "@/shared/constants/routes";
import { useI18n } from "@/shared/hooks/use-i18n";

function getSeverityBadge(percent: number) {
  if (percent >= 70) return { label: "Высокий", className: "bg-red-100 text-red-700 border-red-200" };
  if (percent >= 50) return { label: "Средний", className: "bg-orange-100 text-orange-700 border-orange-200" };
  if (percent >= 30) return { label: "Умеренный", className: "bg-yellow-100 text-yellow-700 border-yellow-200" };
  return { label: "Низкий", className: "bg-green-100 text-green-700 border-green-200" };
}

function PredictSummaryCard({ sessionId, prediction }: { sessionId: string; prediction?: { rawOutput: Record<string, number> } | null }) {
  const { locale } = useI18n();

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

  const top3 = Object.entries(prediction.rawOutput)
    .filter(([key]) => !!PREDICT_DISEASES[key])
    .map(([key, value]) => ({
      key,
      name: PREDICT_DISEASES[key]?.[locale] ?? `#${key}`,
      percent: Math.round(value * 100),
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  const top = top3[0];
  const topBadge = getSeverityBadge(top?.percent ?? 0);

  return (
    <Card className="shadow-none rounded col-span-1 md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <Brain className="size-5 md:size-6" />
            AI Прогноз
          </CardTitle>
          <Link href={routes.SESSIONS.PREDICT(sessionId)}>
            <Button size="sm" variant="outline">
              <ExternalLink className="size-4" />
              Подробнее
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {top && (
          <div className="rounded-lg border bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground mb-0.5">Наиболее вероятный диагноз</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm leading-tight">{top.name}</span>
              <Badge variant="outline" className={`text-xs px-1.5 py-0 ${topBadge.className}`}>
                {top.percent}% — {topBadge.label}
              </Badge>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {top3.map((item, idx) => (
            <div key={item.key}>
              <div className="flex items-center justify-between mb-1 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs text-muted-foreground shrink-0">{idx + 1}.</span>
                  <span className="text-sm truncate">{item.name}</span>
                </div>
                <span className="text-sm font-semibold shrink-0">{item.percent}%</span>
              </div>
              <Progress value={item.percent} className="h-1.5" />
            </div>
          ))}
        </div>
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
        <PredictSummaryCard sessionId={id} prediction={data?.prediction} />

        <FecesExamInfoTable data={data?.fecesExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <UrineExamInfoTable data={data?.urineExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <ClinicExamInfoTable data={data?.clinicalExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <BloodExamInfoTable data={data?.bloodExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <MucosaExamsTable animalId={data?.animalId} sessionId={data?.id} className="col-span-1 md:col-span-2 lg:col-span-3" />
      </div>
    </div>
  );
}
