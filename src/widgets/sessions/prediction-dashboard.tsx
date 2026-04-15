"use client";

import { useState, useMemo } from "react";
import { Brain, Star, Send, TrendingUp, FlaskConical, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Progress } from "@/shared/components/ui/progress";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { useGetMedicalSessionById, useGetFeedbacksByPrediction } from "@/entities/sessions/services/queries";
import { useCreateFeedback } from "@/entities/sessions/services/mutations";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { createToast } from "@/shared/hooks/use-toast";
import { PREDICT_DISEASES, normalizePredictions, normalizeInputVector } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";

const INPUT_VECTOR_META: Record<string, { name: string; unit: string }> = {
  coe:                  { name: "СОЭ",                          unit: "мм/ч"       },
  urea:                 { name: "Мочевина",                     unit: "ммоль/л"    },
  zinc:                 { name: "Цинк",                         unit: "ммоль/л"    },
  pulse:                { name: "Пульс",                        unit: "уд/мин"     },
  cobalt:               { name: "Кобальт",                      unit: "ммоль/л"    },
  copper:               { name: "Медь",                         unit: "ммоль/л"    },
  albumin:              { name: "Альбумины",                    unit: "%"          },
  glucose:              { name: "Глюкоза",                      unit: "ммоль/л"    },
  obesity:              { name: "Ожирение",                     unit: ""           },
  urinePh:              { name: "pH мочи",                      unit: "pH"         },
  bodyType:             { name: "Тип тела",                     unit: ""           },
  carotene:             { name: "Каротин",                      unit: "мкмоль/л"   },
  creatine:             { name: "Креатин",                      unit: "ммоль/л"    },
  skinPain:             { name: "Боль кожи",                    unit: ""           },
  skinTemp:             { name: "Температура кожи",             unit: ""           },
  uricAcid:             { name: "Мочевая кислота",              unit: "ммоль/л"    },
  vitaminA:             { name: "Витамин А",                    unit: "мкмоль/л"   },
  vitaminB:             { name: "Витамин В",                    unit: "мкмоль/л"   },
  vitaminC:             { name: "Витамин С",                    unit: "мкмоль/л"   },
  woolType:             { name: "Шерсть",                       unit: ""           },
  fecesForm:            { name: "Форма кала",                   unit: ""           },
  lymphPain:            { name: "Боль лимфоузла",               unit: ""           },
  lymphSize:            { name: "Размер лимфоузла",             unit: ""           },
  lymphTemp:            { name: "Температура лимфоузла",        unit: ""           },
  manganese:            { name: "Марганец",                     unit: "ммоль/л"    },
  skinColor:            { name: "Цвет кожи",                    unit: ""           },
  skinSmell:            { name: "Запах кожи",                   unit: ""           },
  citricAcid:           { name: "Лимонная кислота",             unit: "ммоль/л"    },
  creatinine:           { name: "Креатинин",                    unit: "мкмоль/л"   },
  dryResidue:           { name: "Сухой остаток",                unit: "%"          },
  fecesColor:           { name: "Цвет кала",                    unit: ""           },
  fecesSmell:           { name: "Запах кала",                   unit: ""           },
  hemoglobin:           { name: "Гемоглобин",                   unit: "г/л"        },
  lacticAcid:           { name: "Молочная кислота",             unit: "ммоль/л"    },
  lymphShape:           { name: "Форма лимфоузла",              unit: ""           },
  rumination:           { name: "Жвачка (румминация)",          unit: ""           },
  urineColor:           { name: "Цвет мочи",                    unit: ""           },
  urineSmell:           { name: "Запах мочи",                   unit: ""           },
  urineSugar:           { name: "Сахар (моча)",                 unit: "ммоль/л"    },
  fecesAmount:          { name: "Количество кала",              unit: "кг"         },
  glutathione:          { name: "Глутатион",                    unit: "ммоль/л"    },
  pyruvicAcid:          { name: "Пировиноградная кислота",      unit: "ммоль/л"    },
  skinSurface:          { name: "Поверхность кожи",             unit: ""           },
  temperament:          { name: "Темперамент",                  unit: ""           },
  temperature:          { name: "Температура",                  unit: "°C"         },
  totalLipids:          { name: "Общие липиды",                 unit: "г/л"        },
  urineAmount:          { name: "Количество мочи",              unit: "л/сутки"    },
  betaGlobulin:         { name: "Бета-глобулины",               unit: "%"          },
  bodyPosition:         { name: "Поза тела",                    unit: ""           },
  constitution:         { name: "Конституция",                  unit: ""           },
  ketoneBodies:         { name: "Кетоновые тела",               unit: "г/л"        },
  lymphSurface:         { name: "Поверхность лимфоузла",        unit: ""           },
  skinHumidity:         { name: "Влажность кожи",               unit: ""           },
  totalCalcium:         { name: "Общий кальций",                unit: "ммоль/л"    },
  totalProtein:         { name: "Общий белок",                  unit: "г/л"        },
  urineAcetone:         { name: "Ацетон (моча)",                unit: "ммоль/л"    },
  urineClarity:         { name: "Прозрачность мочи",            unit: ""           },
  urineProtein:         { name: "Белок (моча)",                 unit: "г/л"        },
  alphaGlobulin:        { name: "Альфа-глобулины",              unit: "%"          },
  gammaGlobulin:        { name: "Гамма-глобулины",              unit: "%"          },
  lymphMobility:        { name: "Подвижность лимфоузла",        unit: ""           },
  phospholipids:        { name: "Фосфолипиды",                  unit: "г/л"        },
  infusoriaCount:       { name: "Инфузории рубца",              unit: "кол-во"     },
  leukocyteCount:       { name: "Лейкоциты",                    unit: "тыс./мкл"   },
  skinElasticity:       { name: "Эластичность кожи",            unit: ""           },
  totalBilirubin:       { name: "Билирубин общий",              unit: "мкмоль/л"   },
  urineBilirubin:       { name: "Билирубин (моча)",             unit: "мкмоль/л"   },
  alkalineReserve:      { name: "Щелочный резерв",              unit: "об% СО₂"    },
  directBilirubin:      { name: "Билирубин прямой",             unit: "мкмоль/л"   },
  respiratoryRate:      { name: "Дыхание",                      unit: "вдохов/мин" },
  rumenFluidState:      { name: "Состояние рубца",              unit: ""           },
  skinSensitivity:      { name: "Чувствительность кожи",        unit: ""           },
  urineEpithelium:      { name: "Эпителий (моча)",              unit: "кол-во"     },
  urineLeukocytes:      { name: "Лейкоциты (моча)",             unit: "кол-во"     },
  waterPercentage:      { name: "Вода",                         unit: "%"          },
  erythrocyteCount:     { name: "Эритроциты",                   unit: "млн/мкл"    },
  fecesConsistency:     { name: "Консистенция кала",            unit: ""           },
  lymphConsistency:     { name: "Консистенция лимфоузла",       unit: ""           },
  residualNitrogen:     { name: "Остаточный азот",              unit: "ммоль/л"    },
  thrombocyteCount:     { name: "Тромбоциты",                   unit: "тыс./мкл"   },
  totalCholesterol:     { name: "Холестерол общий",             unit: "ммоль/л"    },
  urineConsistency:     { name: "Консистенция мочи",            unit: ""           },
  organicPhosphorus:    { name: "Общий фосфор",                 unit: "ммоль/л"    },
  urineErythrocytes:    { name: "Эритроциты (моча)",            unit: "кол-во"     },
  urineSaltCrystals:    { name: "Кристалы солей (моча)",        unit: ""           },
  urineUrobilinogen:    { name: "Уробилирубин (моча)",          unit: "мкмоль/л"   },
  fecesUndigestedFood:  { name: "Непереваренная пища",          unit: "%"          },
  urineMicrobialBodies: { name: "Микробные тела (моча)",        unit: "кол-во"     },
};

function getSeverityBadge(percent: number) {
  if (percent >= 70) return { label: "Высокий", className: "bg-red-100 text-red-700 border-red-200" };
  if (percent >= 50) return { label: "Средний", className: "bg-orange-100 text-orange-700 border-orange-200" };
  if (percent >= 30) return { label: "Умеренный", className: "bg-yellow-100 text-yellow-700 border-yellow-200" };
  return { label: "Низкий", className: "bg-green-100 text-green-700 border-green-200" };
}

function FeedbackForm({ predictionId, role, userData, onSubmitted }: {
  predictionId: string;
  role: string;
  userData: any;
  onSubmitted: () => void;
}) {
  const { mutateAsync: createFeedback, isPending } = useCreateFeedback();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim() && rating === 0) return;
    try {
      await createFeedback({
        predictionId,
        ...(role === "VETERINARIAN"
          ? { veterinarianId: String(userData!.veterinarianId) }
          : { adminId: String(userData!.adminId ?? userData!.userId) }),
        rating: rating || 1,
        comment: comment.trim() || undefined,
      });
      setComment("");
      setRating(0);
      onSubmitted();
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? "Ошибка отправки";
      createToast(Array.isArray(msg) ? msg.join(", ") : msg, "WARNING");
    }
  };

  return (
    <>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Оценка точности прогноза</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-colors"
            >
              <Star
                className={`size-7 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/40"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground self-center">{rating} / 5</span>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Комментарий</p>
        <Textarea
          placeholder="Введите ваш комментарий по результату прогноза..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending || (!comment.trim() && rating === 0)}
        className="w-full sm:w-auto"
      >
        <Send className="size-4 mr-2" />
        {isPending ? "Отправка..." : "Отправить"}
      </Button>
    </>
  );
}

type Props = { id: string };

export function PredictionDashboard({ id }: Props) {
  const { locale } = useI18n();
  const { userData } = useAuthData();
  const { data: session, isLoading } = useGetMedicalSessionById(id);

  const prediction = session?.prediction;

  const { data: feedbacksData, refetch: refetchFeedbacks } = useGetFeedbacksByPrediction(
    prediction?.id ?? "",
    !!prediction?.id,
  );

  const allDiagnoses = useMemo(() => prediction
    ? normalizePredictions(prediction.rawOutput).map((d) => ({
        key: d.diseaseIndex,
        name: PREDICT_DISEASES[d.diseaseIndex]?.[locale] ?? d.diseaseName,
        percent: Math.round(d.probability * 100),
      }))
    : [], [prediction, locale]);

  const topDiagnosis = allDiagnoses[0];
  const topBadge = getSeverityBadge(topDiagnosis?.percent ?? 0);

  const inputEntries = useMemo(() =>
    prediction?.inputVector
      ? Object.entries(normalizeInputVector(prediction.inputVector))
      : [],
  [prediction?.inputVector]);

  const role = userData?.role;
  const canComment = role === "VETERINARIAN" || role === "ADMIN" || role === "SUPER_ADMIN";

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 w-full bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (!prediction) {
    return (
      <Card className="shadow-none rounded">
        <CardContent className="py-10 text-center text-muted-foreground">
          <Brain className="size-10 mx-auto mb-3 opacity-30" />
          <p>Прогноз ещё не сформирован.</p>
          <p className="text-sm mt-1">Отправьте сессию, чтобы получить AI-результат.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* 1. Наиболее вероятный диагноз — full width */}
      <Card className="shadow-none rounded border-l-4 border-l-red-500">
        <CardContent className="py-0">
          <p className="text-xs text-muted-foreground mb-2">Наиболее вероятный диагноз</p>
          <div className="flex items-end gap-3 flex-wrap">
            <Brain className="size-6 text-red-500 shrink-0" />
            <span className="text-xl font-bold">{topDiagnosis?.name ?? "—"}</span>
            <Badge className={topBadge.className}>
              {topDiagnosis?.percent ?? 0}% — {topBadge.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 2. Вероятные диагнозы | 85 значений */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Вероятные диагнозы */}
        <Card className="shadow-none rounded flex flex-col max-h-[520px]">
          <CardHeader className="shrink-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <TrendingUp className="size-5 md:size-6" />
              Вероятные диагнозы ({allDiagnoses.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-1.5 pb-3">
            {allDiagnoses.map((item, idx) => {
              const badge = getSeverityBadge(item.percent);
              return (
                <div key={item.key}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-sm text-muted-foreground shrink-0 w-6 tabular-nums">{idx + 1}.</span>
                      <span className="text-sm font-medium truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pr-1">
                      <span className="text-sm font-semibold tabular-nums">{item.percent}%</span>
                      <Badge variant="outline" className={`text-[9px] px-1 py-0 h-3.5 leading-none rounded-sm ${badge.className}`}>
                        {badge.label}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.percent} className="h-1 mt-0.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Входные значения */}
        <Card className="shadow-none rounded flex flex-col max-h-[520px]">
          <CardHeader className="shrink-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <FlaskConical className="size-5 md:size-6" />
              Входные значения ({inputEntries.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pb-3">
            {inputEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">Нет данных</p>
            ) : (
              <div className="space-y-0">
                {inputEntries.map(([key, value], index) => {
                  const meta = INPUT_VECTOR_META[key];
                  return (
                    <div key={key} className="flex items-center justify-between gap-2 py-[5px] border-b border-border/30 last:border-0">
                      <span className="text-sm text-muted-foreground leading-none">
                        <span className="tabular-nums text-muted-foreground/50 mr-1">{index + 1}.</span>
                        {meta?.name ?? key}
                      </span>
                      <span className="text-sm font-semibold shrink-0 tabular-nums pr-1">
                        {value}
                        {meta?.unit ? <span className="text-xs font-normal text-muted-foreground ml-1">({meta.unit})</span> : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3. Комментарии */}
      <Card className="shadow-none rounded">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <MessageSquare className="size-5 md:size-6" />
            Комментарии
            {(feedbacksData?.meta?.total ?? 0) > 0 && (
              <Badge variant="outline" className="ml-1 text-xs">{feedbacksData!.meta.total}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Список существующих комментариев */}
          {(feedbacksData?.data ?? []).length > 0 && (
            <div className="space-y-3 mb-2">
              {feedbacksData!.data.map((fb) => {
                const author = fb.veterinarianId ? "Ветеринар" : fb.adminId ? "Администратор" : "Пользователь";
                return (
                  <div key={fb.id} className="rounded-lg border px-3 py-2.5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{author}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`size-3.5 ${s <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {fb.comment && (
                      <p className="text-sm">{String(fb.comment)}</p>
                    )}
                  </div>
                );
              })}
              <Separator />
            </div>
          )}

          {/* Форма отправки — только для ветеринаров и администраторов */}
          {canComment && prediction && (
            <FeedbackForm
              predictionId={prediction.id}
              role={role!}
              userData={userData}
              onSubmitted={refetchFeedbacks}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
