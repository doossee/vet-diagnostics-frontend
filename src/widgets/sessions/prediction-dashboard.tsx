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
import { PREDICT_DISEASES, normalizePredictions, normalizeInputVector, INPUT_VECTOR_KEYS } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";

const INPUT_VECTOR_META: Record<string, { name: string; unit: string }> = {
  // 1–7: общие показатели крови и физиология
  pulse:                { name: "Пульс",                        unit: "уд/мин"     },
  respiratoryRate:      { name: "Дыхание",                      unit: "вдохов/мин" },
  temperature:          { name: "Температура",                  unit: "°C"         },
  erythrocyteCount:     { name: "Эритроциты",                   unit: "млн/мкл"    },
  leukocyteCount:       { name: "Лейкоциты",                    unit: "тыс./мкл"   },
  thrombocyteCount:     { name: "Тромбоциты",                   unit: "тыс./мкл"   },
  coe:                  { name: "СОЭ",                          unit: "мм/ч"       },
  // 8–9: состав крови
  waterPercentage:      { name: "Вода",                         unit: "%"          },
  dryResidue:           { name: "Сухой остаток",                unit: "%"          },
  // 10–16: биохимия крови — белки
  glutathione:          { name: "Глутатион",                    unit: "ммоль/л"    },
  hemoglobin:           { name: "Гемоглобин",                   unit: "г/л"        },
  totalProtein:         { name: "Общий белок",                  unit: "г/л"        },
  albumin:              { name: "Альбумины",                    unit: "%"          },
  alphaGlobulin:        { name: "Альфа-глобулины",              unit: "%"          },
  betaGlobulin:         { name: "Бета-глобулины",               unit: "%"          },
  gammaGlobulin:        { name: "Гамма-глобулины",              unit: "%"          },
  // 17–22: азотистый обмен и резервы
  residualNitrogen:     { name: "Остаточный азот",              unit: "ммоль/л"    },
  urea:                 { name: "Мочевина",                     unit: "ммоль/л"    },
  uricAcid:             { name: "Мочевая кислота",              unit: "ммоль/л"    },
  creatinine:           { name: "Креатинин",                    unit: "мкмоль/л"   },
  alkalineReserve:      { name: "Щелочный резерв",              unit: "об% СО₂"    },
  glucose:              { name: "Глюкоза",                      unit: "ммоль/л"    },
  // 23–31: липиды и органические кислоты
  ketoneBodies:         { name: "Кетоновые тела",               unit: "г/л"        },
  totalBilirubin:       { name: "Билирубин общий",              unit: "мкмоль/л"   },
  directBilirubin:      { name: "Билирубин прямой",             unit: "мкмоль/л"   },
  totalCholesterol:     { name: "Холестерол общий",             unit: "ммоль/л"    },
  totalLipids:          { name: "Общие липиды",                 unit: "г/л"        },
  phospholipids:        { name: "Фосфолипиды",                  unit: "г/л"        },
  lacticAcid:           { name: "Молочная кислота",             unit: "ммоль/л"    },
  pyruvicAcid:          { name: "Пировиноградная кислота",      unit: "ммоль/л"    },
  citricAcid:           { name: "Лимонная кислота",             unit: "ммоль/л"    },
  // 32–41: витамины и микроэлементы
  carotene:             { name: "Каротин",                      unit: "мкмоль/л"   },
  vitaminA:             { name: "Витамин А",                    unit: "мкмоль/л"   },
  vitaminC:             { name: "Витамин С",                    unit: "мкмоль/л"   },
  organicPhosphorus:    { name: "Общий фосфор",                 unit: "ммоль/л"    },
  totalCalcium:         { name: "Общий кальций",                unit: "ммоль/л"    },
  creatine:             { name: "Креатин",                      unit: "ммоль/л"    },
  copper:               { name: "Медь",                         unit: "ммоль/л"    },
  zinc:                 { name: "Цинк",                         unit: "ммоль/л"    },
  manganese:            { name: "Марганец",                     unit: "ммоль/л"    },
  cobalt:               { name: "Кобальт",                      unit: "ммоль/л"    },
  // 42–57: моча
  urineColor:           { name: "Цвет мочи",                    unit: ""           },
  urineSmell:           { name: "Запах мочи",                   unit: ""           },
  urineClarity:         { name: "Прозрачность мочи",            unit: ""           },
  urineConsistency:     { name: "Консистенция мочи",            unit: ""           },
  urinePh:              { name: "pH мочи",                      unit: "pH"         },
  urineAcetone:         { name: "Ацетон (моча)",                unit: "ммоль/л"    },
  urineProtein:         { name: "Белок (моча)",                 unit: "г/л"        },
  urineBilirubin:       { name: "Билирубин (моча)",             unit: "мкмоль/л"   },
  urineUrobilinogen:    { name: "Уробилирубин (моча)",          unit: "мкмоль/л"   },
  urineSugar:           { name: "Сахар (моча)",                 unit: "ммоль/л"    },
  urineLeukocytes:      { name: "Лейкоциты (моча)",             unit: "кол-во"     },
  urineEpithelium:      { name: "Эпителий (моча)",              unit: "кол-во"     },
  urineMicrobialBodies: { name: "Микробные тела (моча)",        unit: "кол-во"     },
  urineErythrocytes:    { name: "Эритроциты (моча)",            unit: "кол-во"     },
  urineSaltCrystals:    { name: "Кристалы солей (моча)",        unit: ""           },
  urineAmount:          { name: "Количество мочи",              unit: "л/сутки"    },
  // 58–63: кал
  fecesSmell:           { name: "Запах кала",                   unit: ""           },
  fecesColor:           { name: "Цвет кала",                    unit: ""           },
  fecesConsistency:     { name: "Консистенция кала",            unit: ""           },
  fecesForm:            { name: "Форма кала",                   unit: ""           },
  fecesAmount:          { name: "Количество кала",              unit: "кг"         },
  fecesUndigestedFood:  { name: "Непереваренная пища",          unit: "%"          },
  // 64–67: выделения слизистых
  mucosaOral:           { name: "Оральные выделения",           unit: ""           },
  mucosaNasal:          { name: "Назальные выделения",          unit: ""           },
  mucosaOcular:         { name: "Окулярные выделения",          unit: ""           },
  mucosaVaginal:        { name: "Влагалищные выделения",        unit: ""           },
  // 68–71: общее состояние
  rumination:           { name: "Жвачка (румминация)",          unit: ""           },
  obesity:              { name: "Ожирение",                     unit: ""           },
  bodyType:             { name: "Тип тела",                     unit: ""           },
  bodyPosition:         { name: "Поза тела",                    unit: ""           },
  // 72–78: кожа
  wool:                 { name: "Шерсть",                       unit: ""           },
  skinColor:            { name: "Цвет кожи",                    unit: ""           },
  skinHumidity:         { name: "Влажность кожи",               unit: ""           },
  skinSmell:            { name: "Запах кожи",                   unit: ""           },
  skinTemp:             { name: "Температура кожи",             unit: ""           },
  skinSurface:          { name: "Поверхность кожи",             unit: ""           },
  skinElasticity:       { name: "Эластичность кожи",            unit: ""           },
  // 79–85: лимфоузлы
  lymphSize:            { name: "Размер лимфоузла",             unit: ""           },
  lymphShape:           { name: "Форма лимфоузла",              unit: ""           },
  lymphSurface:         { name: "Поверхность лимфоузла",        unit: ""           },
  lymphConsistency:     { name: "Консистенция лимфоузла",       unit: ""           },
  lymphTemp:            { name: "Температура лимфоузла",        unit: ""           },
  lymphPain:            { name: "Боль лимфоузла",               unit: ""           },
  lymphMobility:        { name: "Подвижность лимфоузла",        unit: ""           },
  // дополнительные ключи (не в values.txt)
  vitaminB:             { name: "Витамин В",                    unit: "мкмоль/л"   },
  temperament:          { name: "Темперамент",                  unit: ""           },
  skinPain:             { name: "Боль кожи",                    unit: ""           },
  skinSensitivity:      { name: "Чувствительность кожи",        unit: ""           },
  constitution:         { name: "Конституция",                  unit: ""           },
  infusoriaCount:       { name: "Инфузории рубца",              unit: "кол-во"     },
  rumenFluidState:      { name: "Состояние рубца",              unit: ""           },
};

const INPUT_VECTOR_GROUPS: { label: string; firstKey: string }[] = [
  { label: "Общие показатели",       firstKey: "pulse"             },
  { label: "Состав крови",           firstKey: "waterPercentage"   },
  { label: "Белки крови",            firstKey: "glutathione"       },
  { label: "Азотистый обмен",        firstKey: "residualNitrogen"  },
  { label: "Липиды и кислоты",       firstKey: "ketoneBodies"      },
  { label: "Витамины и минералы",    firstKey: "carotene"          },
  { label: "Моча",                   firstKey: "urineColor"        },
  { label: "Кал",                    firstKey: "fecesSmell"        },
  { label: "Выделения слизистых",    firstKey: "mucosaOral"        },
  { label: "Общее состояние",        firstKey: "rumination"        },
  { label: "Кожа и шерсть",         firstKey: "wool"              },
  { label: "Лимфоузлы",             firstKey: "lymphSize"         },
];

function formatPercent(probability: number): string {
  const pct = probability * 100;
  if (pct >= 1) return String(Math.round(pct));
  if (pct >= 0.01) return pct.toFixed(2);
  if (pct >= 0.000001) return pct.toPrecision(2);
  return "0";
}

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

  const allDiagnoses = useMemo(() => {
    if (!prediction) return [];
    const fromOutput = normalizePredictions(prediction.rawOutput);
    const outputMap = new Map(fromOutput.map((d) => [d.diseaseIndex, d.probability]));
    return Object.keys(PREDICT_DISEASES).map((key) => ({
      key,
      name: PREDICT_DISEASES[key]?.[locale] ?? key,
      probability: outputMap.get(key) ?? 0,
      percent: Math.round((outputMap.get(key) ?? 0) * 100),
    })).sort((a, b) => b.probability - a.probability);
  }, [prediction, locale]);

  const topDiagnosis = allDiagnoses[0];
  const topBadge = getSeverityBadge(topDiagnosis?.percent ?? 0);

  const inputEntries = useMemo(() => {
    if (!prediction?.inputVector) return [];
    const entries = Object.entries(normalizeInputVector(prediction.inputVector));
    return entries.sort(([a], [b]) => {
      const ai = INPUT_VECTOR_KEYS.indexOf(a);
      const bi = INPUT_VECTOR_KEYS.indexOf(b);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  },
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
              {topDiagnosis ? formatPercent(topDiagnosis.probability) : "0"}% — {topBadge.label}
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
                      <span className="text-sm font-semibold tabular-nums">
                        {formatPercent(item.probability)}%
                      </span>
                      <Badge variant="outline" className={`text-[9px] px-1 py-0 h-3.5 leading-none rounded-sm ${badge.className}`}>
                        {badge.label}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.percent > 0 ? item.percent : item.probability > 0 ? 0.3 : 0} className="h-1 mt-0.5" />
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
                  const group = INPUT_VECTOR_GROUPS.find((g) => g.firstKey === key);
                  return (
                    <div key={key}>
                      {group && (
                        <div className={`flex items-center gap-2 ${index === 0 ? "mb-1" : "mt-3 mb-1"}`}>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60 shrink-0">
                            {group.label}
                          </span>
                          <div className="flex-1 h-px bg-border/40" />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2 py-[5px] border-b border-border/30 last:border-0">
                        <span className="text-sm text-muted-foreground leading-none">
                          <span className="tabular-nums text-muted-foreground/50 mr-1">{index + 1}.</span>
                          {meta?.name ?? key}
                        </span>
                        <span className="text-sm font-semibold shrink-0 tabular-nums pr-1">
                          {value}
                          {meta?.unit ? <span className="text-xs font-normal text-muted-foreground ml-1">({meta.unit})</span> : null}
                        </span>
                      </div>
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
