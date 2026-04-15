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
import { PREDICT_DISEASES } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";

const INPUT_VECTOR_DATA: { name: string; unit: string }[] = [
  { name: "Пульс",                        unit: "уд.мин"    },
  { name: "Дыхание",                      unit: "вдохов/мин"},
  { name: "Температура",                  unit: "°C"        },
  { name: "Эритроциты",                   unit: "млн/мкл"   },
  { name: "Лейкоциты",                    unit: "тыс./мкл"  },
  { name: "Тромбоциты",                   unit: "тыс./мкл"  },
  { name: "СОЭ",                          unit: "мм/ч"      },
  { name: "Вода",                         unit: "%"         },
  { name: "Сухой остаток",                unit: "%"         },
  { name: "Глутатион",                    unit: "ммоль/л"   },
  { name: "Гемоглобин",                   unit: "г/л"       },
  { name: "Общий белок сыворотки",        unit: "г/л"       },
  { name: "Альбумины",                    unit: "%"         },
  { name: "Альфа-глобулины",              unit: "%"         },
  { name: "Бета-глобулины",               unit: "%"         },
  { name: "Гамма-глобулины",              unit: "%"         },
  { name: "Остаточный азот",              unit: "ммоль/л"   },
  { name: "Мочевина",                     unit: "ммоль/л"   },
  { name: "Мочевая кислота",              unit: "ммоль/л"   },
  { name: "Креатинин",                    unit: "мкмоль/л"  },
  { name: "Щелочный резерв",              unit: "об% СО₂"   },
  { name: "Глюкоза",                      unit: "ммоль/л"   },
  { name: "Кетоновые тела",               unit: "г/л"       },
  { name: "Билирубин общий",              unit: "мкмоль/л"  },
  { name: "Билирубин прямой",             unit: "мкмоль/л"  },
  { name: "Холестерол общий",             unit: "ммоль/л"   },
  { name: "Общие липиды",                 unit: "г/л"       },
  { name: "Фосфолипиды",                  unit: "г/л"       },
  { name: "Молочная кислота",             unit: "ммоль/л"   },
  { name: "Пировиноградная кислота",      unit: "ммоль/л"   },
  { name: "Лимонная кислота",             unit: "ммоль/л"   },
  { name: "Каротин",                      unit: "мкмоль/л"  },
  { name: "Витамин А",                    unit: "мкмоль/л"  },
  { name: "Витамин С",                    unit: "мкмоль/л"  },
  { name: "Общий фосфор",                 unit: "ммоль/л"   },
  { name: "Общий кальций",                unit: "ммоль/л"   },
  { name: "Креатин",                      unit: "ммоль/л"   },
  { name: "Медь",                         unit: "ммоль/л"   },
  { name: "Цинк",                         unit: "ммоль/л"   },
  { name: "Марганец",                     unit: "ммоль/л"   },
  { name: "Кобальт",                      unit: "ммоль/л"   },
  { name: "Цвет мочи",                    unit: ""          },
  { name: "Запах мочи",                   unit: ""          },
  { name: "Прозрачность мочи",            unit: ""          },
  { name: "Консистенция мочи",            unit: ""          },
  { name: "Среда",                        unit: "pH"        },
  { name: "Кетоновые тела (ацетон)",      unit: "ммоль/л"   },
  { name: "Белок",                        unit: "г/л"       },
  { name: "Билирубин",                    unit: "мкмоль/л"  },
  { name: "Уробилирубин",                 unit: "мкмоль/л"  },
  { name: "Сахар",                        unit: "ммоль/л"   },
  { name: "Лейкоциты (моча)",             unit: "кол-во"    },
  { name: "Эпителий",                     unit: "кол-во"    },
  { name: "Микробные тела",               unit: "кол-во"    },
  { name: "Эритроциты (моча)",            unit: "кол-во"    },
  { name: "Кристалы солей",               unit: ""          },
  { name: "Количество мочи",              unit: "л/сутки"   },
  { name: "Запах кала",                   unit: ""          },
  { name: "Цвет кала",                    unit: ""          },
  { name: "Консистенция кала",            unit: ""          },
  { name: "Форма кала",                   unit: ""          },
  { name: "Количество кала",              unit: "кг"        },
  { name: "Непереваренная пища",          unit: "%"         },
  { name: "Оральная слизистая",           unit: ""          },
  { name: "Назальная слизистая",          unit: ""          },
  { name: "Окулярная слизистая",          unit: ""          },
  { name: "Влагалищная слизистая",        unit: ""          },
  { name: "Жвачка",                       unit: ""          },
  { name: "Избыточный вес",               unit: ""          },
  { name: "Состояние тела",               unit: ""          },
  { name: "Поза тела",                    unit: ""          },
  { name: "Шерсть",                       unit: ""          },
  { name: "Цвет кожи",                    unit: ""          },
  { name: "Влажность кожи",               unit: ""          },
  { name: "Запах кожи",                   unit: ""          },
  { name: "Температура кожи",             unit: ""          },
  { name: "Поверхность кожи",             unit: ""          },
  { name: "Эластичность кожи",            unit: ""          },
  { name: "Размер лимфоузла",             unit: ""          },
  { name: "Форма лимфоузла",              unit: ""          },
  { name: "Поверхность лимфоузла",        unit: ""          },
  { name: "Консистенция лимфоузла",       unit: ""          },
  { name: "Температура лимфоузла",        unit: ""          },
  { name: "Боль лимфоузла",               unit: ""          },
  { name: "Подвижность лимфоузла",        unit: ""          },
];

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
    ? Object.entries(prediction.rawOutput as Record<string, number>)
        .filter(([key]) => key !== "0" && PREDICT_DISEASES[key])
        .map(([key, value]) => ({
          key,
          name: PREDICT_DISEASES[key]?.[locale] ?? `#${key}`,
          percent: Math.round(value * 100),
        }))
        .sort((a, b) => b.percent - a.percent)
    : [], [prediction, locale]);

  const topDiagnosis = allDiagnoses[0];
  const topBadge = getSeverityBadge(topDiagnosis?.percent ?? 0);

  // inputVector may come as array OR as object {"0": val, "1": val, ...}
  const rawVector = prediction?.inputVector;
  const inputVector: number[] = useMemo(() => Array.isArray(rawVector)
    ? (rawVector as number[])
    : rawVector && typeof rawVector === "object"
      ? Object.entries(rawVector as Record<string, unknown>)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([, v]) => Number(v))
      : [], [rawVector]);

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

        {/* 85 входных значений */}
        <Card className="shadow-none rounded flex flex-col max-h-[520px]">
          <CardHeader className="shrink-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <FlaskConical className="size-5 md:size-6" />
              Входные значения ({inputVector.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pb-3">
            {inputVector.length === 0 ? (
              <p className="text-sm text-muted-foreground">Нет данных</p>
            ) : (
              <div className="space-y-0">
                {inputVector.map((value, index) => {
                  const meta = INPUT_VECTOR_DATA[index];
                  return (
                    <div key={index} className="flex items-center justify-between gap-2 py-[5px] border-b border-border/30 last:border-0">
                      <span className="text-sm text-muted-foreground leading-none">
                        <span className="tabular-nums text-muted-foreground/50 mr-1">{index + 1}.</span>
                        {meta?.name ?? `x${index + 1}`}
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
