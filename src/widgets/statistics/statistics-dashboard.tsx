"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle,
  FileText,
  PenLine,
  Clock,
  PawPrint,
  AlertCircle,
  TrendingUp,
  BarChart3,
  CalendarRange,
  ChevronDown,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { format, subDays, subMonths, subYears, startOfDay, endOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/components/ui/chart";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import {
  useGetStatisticsOverview,
  useGetStatisticsDiseases,
  useGetStatisticsTrends,
} from "@/entities/statistics/services/queries";
import { PREDICT_DISEASES } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";

// ─── Date range presets ───────────────────────────────────────────────────────

const PRESETS = [
  { label: "Неделя", getRange: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { label: "Месяц", getRange: () => ({ from: subMonths(new Date(), 1), to: new Date() }) },
  { label: "3 мес.", getRange: () => ({ from: subMonths(new Date(), 3), to: new Date() }) },
  { label: "Год", getRange: () => ({ from: subYears(new Date(), 1), to: new Date() }) },
];

function toIsoStart(d: Date) { return startOfDay(d).toISOString().slice(0, 10); }
function toIsoEnd(d: Date) { return endOfDay(d).toISOString().slice(0, 10); }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPeriod(period: string) {
  const [year, month] = period.split("-");
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// ─── Chart configs ────────────────────────────────────────────────────────────

const barChartConfig = {
  count: { label: "Кол-во случаев", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const trendChartConfig = {
  total: { label: "Всего сессий", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

// ─── Sub-components ──────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ReactNode;
  accent?: string;
}

function StatCard({ title, value, description, icon, accent = "text-primary" }: StatCardProps) {
  return (
    <Card className="shadow-none rounded">
      <CardContent className="pt-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-3xl font-bold ${accent}`}>{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className={`p-2 rounded-lg bg-muted ${accent}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card className="shadow-none rounded">
      <CardContent className="pt-5">
        <div className="space-y-2 animate-pulse">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-8 w-16 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function StatisticsDashboard() {
  const { locale } = useI18n();
  const getDiseaseName = (diseaseIndex: string, fallback: string) =>
    PREDICT_DISEASES[diseaseIndex]?.[locale] ?? fallback;

  const defaultRange: DateRange = { from: subMonths(new Date(), 1), to: new Date() };
  const [range, setRange] = useState<DateRange>(defaultRange);
  const [appliedRange, setAppliedRange] = useState<DateRange>(defaultRange);
  const [calOpen, setCalOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>("Месяц");

  const params = {
    startDate: appliedRange.from ? `${toIsoStart(appliedRange.from)}T00:00:00.000Z` : undefined,
    endDate: appliedRange.to ? `${toIsoEnd(appliedRange.to)}T23:59:59.999Z` : undefined,
  };

  const { data: overview, isLoading: overviewLoading } = useGetStatisticsOverview(params);
  const { data: diseases, isLoading: diseasesLoading } = useGetStatisticsDiseases(params);
  const { data: trends, isLoading: trendsLoading } = useGetStatisticsTrends(params);

  const handleApply = () => {
    setAppliedRange(range);
    setCalOpen(false);
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    const r = preset.getRange();
    setRange(r);
    setAppliedRange(r);
    setActivePreset(preset.label);
    setCalOpen(false);
  };

  const handleReset = () => {
    setRange(defaultRange);
    setAppliedRange(defaultRange);
    setActivePreset("Месяц");
  };

  const formatRange = () => {
    if (!appliedRange.from) return "Выберите период";
    if (!appliedRange.to) return format(appliedRange.from, "dd.MM.yyyy", { locale: ru });
    return `${format(appliedRange.from, "dd.MM.yyyy", { locale: ru })} — ${format(appliedRange.to, "dd.MM.yyyy", { locale: ru })}`;
  };

  const trendData = (trends?.data ?? []).map((item) => {
    const row: Record<string, number | string> = {
      period: formatPeriod(item.period),
      total: item.total,
    };
    item.diseases
      .filter((d) => d.diseaseIndex !== "0")
      .forEach((d) => {
        row[getDiseaseName(d.diseaseIndex, d.diseaseName)] = d.count;
      });
    return row;
  });

  const top5 = (diseases?.data ?? []).filter((d) => d.diseaseIndex !== "0").slice(0, 5);
  const localizedTop5 = top5.map((d) => ({ ...d, localizedName: getDiseaseName(d.diseaseIndex, d.diseaseName) }));
  const maxCount = top5[0]?.count ?? 1;

  // Build dynamic trend series from actual data
  const trendDiseaseNames = Array.from(
    new Set(
      (trends?.data ?? []).flatMap((p) =>
        p.diseases
          .filter((d) => d.diseaseIndex !== "0")
          .map((d) => getDiseaseName(d.diseaseIndex, d.diseaseName))
      )
    )
  ).slice(0, 3);

  const TREND_COLORS = ["#e05c2f", "#2fa84f", "#9333ea"];

  return (
    <div className="space-y-6">
      {/* Date filter */}
      <Card className="shadow-none rounded py-2">
        <CardContent className="py-3!">
          <div className="flex flex-wrap items-center gap-2">
            <CalendarRange className="size-4 text-muted-foreground shrink-0" />

            {/* Quick presets */}
            <div className="flex gap-1 flex-wrap">
              {PRESETS.map((p) => (
                <Button
                  key={p.label}
                  size="sm"
                  variant={activePreset === p.label ? "default" : "outline"}
                  className="h-8 px-3 text-xs"
                  onClick={() => handlePreset(p)}
                >
                  {p.label}
                </Button>
              ))}
            </div>

            <div className="w-px h-6 bg-border hidden sm:block" />

            {/* Date range popover */}
            <Popover open={calOpen} onOpenChange={setCalOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-2 text-sm font-normal min-w-[220px] justify-between">
                  <span className="flex items-center gap-1.5">
                    <CalendarRange className="size-3.5 text-muted-foreground" />
                    {formatRange()}
                  </span>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={(r) => { if (r) { setRange(r); setActivePreset(null); } }}
                  numberOfMonths={2}
                  locale={ru}
                  captionLayout="dropdown"
                  fromYear={2020}
                  toYear={new Date().getFullYear()}
                />
                <div className="flex justify-end gap-2 p-3 border-t">
                  <Button size="sm" variant="outline" onClick={() => setCalOpen(false)}>Отмена</Button>
                  <Button size="sm" onClick={handleApply} disabled={!range.from || !range.to}>Применить</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground" onClick={handleReset}>
              Сбросить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {overviewLoading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              title="Всего сессий"
              value={(overview?.totalSessions ?? 0).toLocaleString()}
              icon={<FileText className="size-5" />}
              description="За период"
            />
            <StatCard
              title="Отправлено"
              value={(overview?.submittedSessions ?? 0).toLocaleString()}
              icon={<CheckCircle className="size-5" />}
              accent="text-green-600"
            />
            <StatCard
              title="Черновик"
              value={(overview?.draftSessions ?? 0).toLocaleString()}
              icon={<PenLine className="size-5" />}
              accent="text-yellow-600"
            />
            <StatCard
              title="Готово"
              value={(overview?.readySessions ?? 0).toLocaleString()}
              icon={<Clock className="size-5" />}
              accent="text-blue-600"
            />
            <StatCard
              title="Животных обследовано"
              value={(overview?.totalAnimalsExamined ?? 0).toLocaleString()}
              icon={<PawPrint className="size-5" />}
              accent="text-purple-600"
            />
            <Card className="shadow-none rounded border-l-4 border-l-red-500">
              <CardContent className="pt-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Частый диагноз</p>
                    <p className="text-base font-bold text-red-600 leading-tight">
                      {overview?.mostCommonDisease
                        ? getDiseaseName(overview.mostCommonDisease.diseaseIndex, overview.mostCommonDisease.diseaseName)
                        : "—"}
                    </p>
                    {overview?.mostCommonDisease && (
                      <p className="text-xs text-muted-foreground">
                        {overview.mostCommonDisease.count} случаев
                      </p>
                    )}
                  </div>
                  <AlertCircle className="size-5 text-red-500 mt-1" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart — top diseases */}
        <Card className="shadow-none rounded lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <BarChart3 className="size-5" />
              Топ заболеваний по количеству случаев
            </CardTitle>
            {diseases && (
              <CardDescription>Проанализировано {diseases.totalSessionsAnalyzed} сессий</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {diseasesLoading ? (
              <div className="h-72 w-full bg-muted animate-pulse rounded" />
            ) : (
              <ChartContainer config={barChartConfig} className="h-72 w-full">
                <BarChart
                  data={localizedTop5}
                  layout="vertical"
                  margin={{ left: 8, right: 24, top: 0, bottom: 0 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
                  <YAxis
                    type="category"
                    dataKey="localizedName"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    width={160}
                  />
                  <ChartTooltip content={<ChartTooltipContent className="min-w-[11rem]" />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Top 5 list */}
        <Card className="shadow-none rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <Activity className="size-5" />
              Рейтинг заболеваний
            </CardTitle>
            <CardDescription>Топ 5 по частоте</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {diseasesLoading ? (
              <div className="space-y-4 animate-pulse">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 w-3/4 bg-muted rounded" />
                    <div className="h-1.5 w-full bg-muted rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              localizedTop5.map((item, idx) => {
                const pct = Math.round((item.count / maxCount) * 100);
                const colors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
                return (
                  <div key={item.diseaseIndex}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <Badge variant="outline" className="text-xs shrink-0 w-6 h-6 flex items-center justify-center p-0">
                          {idx + 1}
                        </Badge>
                        <span className="text-sm truncate">{item.localizedName}</span>
                      </div>
                      <span className="text-sm font-semibold shrink-0 ml-2">{item.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all ${colors[idx]}`} style={{ width: `${pct}%` }} />
                    </div>
                    {idx < top5.length - 1 && <Separator className="mt-3" />}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trend chart */}
      <Card className="shadow-none rounded">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <TrendingUp className="size-5" />
            Динамика сессий по месяцам
          </CardTitle>
          <CardDescription>Общее количество сессий и топ заболевания за период</CardDescription>
        </CardHeader>
        <CardContent>
          {trendsLoading ? (
            <div className="h-72 w-full bg-muted animate-pulse rounded" />
          ) : (
            <ChartContainer config={trendChartConfig} className="h-72 w-full">
              <AreaChart data={trendData} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  {trendDiseaseNames.map((_, i) => (
                    <linearGradient key={i} id={`gradDisease${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={TREND_COLORS[i]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={TREND_COLORS[i]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="period" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent className="min-w-[11rem]" />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Всего сессий"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#gradTotal)"
                  strokeWidth={2}
                  dot={false}
                />
                {trendDiseaseNames.map((name, i) => (
                  <Area
                    key={name}
                    type="monotone"
                    dataKey={name}
                    name={name}
                    stroke={TREND_COLORS[i]}
                    fill={`url(#gradDisease${i})`}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Full disease table */}
      {!diseasesLoading && top5.length > 0 && (
        <Card className="shadow-none rounded">
          <CardHeader>
            <CardTitle className="text-sm md:text-base">Полный список заболеваний</CardTitle>
            <CardDescription>Отсортировано по количеству случаев</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-2 pr-4 text-left font-medium w-8">#</th>
                  <th className="py-2 pr-4 text-left font-medium">Заболевание</th>
                  <th className="py-2 pr-4 text-right font-medium">Случаев</th>
                  <th className="py-2 text-right font-medium">Доля</th>
                </tr>
              </thead>
              <tbody>
                {diseases!.data.filter((d) => d.diseaseIndex !== "0").map((item, idx) => {
                  const share = ((item.count / diseases!.totalSessionsAnalyzed) * 100).toFixed(1);
                  return (
                    <tr key={item.diseaseIndex} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-2 pr-4 text-muted-foreground">{idx + 1}</td>
                      <td className="py-2 pr-4 font-medium">{getDiseaseName(item.diseaseIndex, item.diseaseName)}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{item.count}</td>
                      <td className="py-2 text-right tabular-nums text-muted-foreground">{share}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
