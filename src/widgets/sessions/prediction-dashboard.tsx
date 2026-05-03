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
import { PREDICT_DISEASES, normalizePredictions, normalizeInputVector, INPUT_VECTOR_KEYS, NULL_FIELD_LABELS } from "@/shared/constants";
import { useI18n } from "@/shared/hooks/use-i18n";

const INPUT_VECTOR_META: Record<string, { unit: string }> = {
  pulse:                { unit: "уд/мин"     },
  respiratoryRate:      { unit: "вдохов/мин" },
  temperature:          { unit: "°C"         },
  erythrocyteCount:     { unit: "млн/мкл"    },
  leukocyteCount:       { unit: "тыс./мкл"   },
  thrombocyteCount:     { unit: "тыс./мкл"   },
  coe:                  { unit: "мм/ч"       },
  waterPercentage:      { unit: "%"          },
  dryResidue:           { unit: "%"          },
  glutathione:          { unit: "ммоль/л"    },
  hemoglobin:           { unit: "г/л"        },
  totalProtein:         { unit: "г/л"        },
  albumin:              { unit: "%"          },
  alphaGlobulin:        { unit: "%"          },
  betaGlobulin:         { unit: "%"          },
  gammaGlobulin:        { unit: "%"          },
  residualNitrogen:     { unit: "ммоль/л"    },
  urea:                 { unit: "ммоль/л"    },
  uricAcid:             { unit: "ммоль/л"    },
  creatinine:           { unit: "мкмоль/л"   },
  alkalineReserve:      { unit: "об% СО₂"    },
  glucose:              { unit: "ммоль/л"    },
  ketoneBodies:         { unit: "г/л"        },
  totalBilirubin:       { unit: "мкмоль/л"   },
  directBilirubin:      { unit: "мкмоль/л"   },
  totalCholesterol:     { unit: "ммоль/л"    },
  totalLipids:          { unit: "г/л"        },
  phospholipids:        { unit: "г/л"        },
  lacticAcid:           { unit: "ммоль/л"    },
  pyruvicAcid:          { unit: "ммоль/л"    },
  citricAcid:           { unit: "ммоль/л"    },
  carotene:             { unit: "мкмоль/л"   },
  vitaminA:             { unit: "мкмоль/л"   },
  vitaminC:             { unit: "мкмоль/л"   },
  organicPhosphorus:    { unit: "ммоль/л"    },
  totalCalcium:         { unit: "ммоль/л"    },
  creatine:             { unit: "ммоль/л"    },
  copper:               { unit: "ммоль/л"    },
  zinc:                 { unit: "ммоль/л"    },
  manganese:            { unit: "ммоль/л"    },
  cobalt:               { unit: "ммоль/л"    },
  urineColor:           { unit: ""           },
  urineSmell:           { unit: ""           },
  urineClarity:         { unit: ""           },
  urineConsistency:     { unit: ""           },
  urinePh:              { unit: "pH"         },
  urineAcetone:         { unit: "ммоль/л"    },
  urineProtein:         { unit: "г/л"        },
  urineBilirubin:       { unit: "мкмоль/л"   },
  urineUrobilinogen:    { unit: "мкмоль/л"   },
  urineSugar:           { unit: "ммоль/л"    },
  urineLeukocytes:      { unit: "кол-во"     },
  urineEpithelium:      { unit: "кол-во"     },
  urineMicrobialBodies: { unit: "кол-во"     },
  urineErythrocytes:    { unit: "кол-во"     },
  urineSaltCrystals:    { unit: ""           },
  urineAmount:          { unit: "л/сутки"    },
  fecesSmell:           { unit: ""           },
  fecesColor:           { unit: ""           },
  fecesConsistency:     { unit: ""           },
  fecesForm:            { unit: ""           },
  fecesAmount:          { unit: "кг"         },
  fecesUndigestedFood:  { unit: "%"          },
  mucosaOral:           { unit: ""           },
  mucosaNasal:          { unit: ""           },
  mucosaOcular:         { unit: ""           },
  mucosaVaginal:        { unit: ""           },
  rumination:           { unit: ""           },
  obesity:              { unit: ""           },
  bodyType:             { unit: ""           },
  bodyPosition:         { unit: ""           },
  wool:                 { unit: ""           },
  skinColor:            { unit: ""           },
  skinHumidity:         { unit: ""           },
  skinSmell:            { unit: ""           },
  skinTemp:             { unit: ""           },
  skinSurface:          { unit: ""           },
  skinElasticity:       { unit: ""           },
  lymphSize:            { unit: ""           },
  lymphShape:           { unit: ""           },
  lymphSurface:         { unit: ""           },
  lymphConsistency:     { unit: ""           },
  lymphTemp:            { unit: ""           },
  lymphPain:            { unit: ""           },
  lymphMobility:        { unit: ""           },
  vitaminB:             { unit: "мкмоль/л"   },
  temperament:          { unit: ""           },
  skinPain:             { unit: ""           },
  skinSensitivity:      { unit: ""           },
  constitution:         { unit: ""           },
  infusoriaCount:       { unit: "кол-во"     },
  rumenFluidState:      { unit: ""           },
};

const INPUT_VECTOR_GROUPS: { label: { ru: string; uz: string }; firstKey: string }[] = [
  { label: { ru: "Общие показатели",    uz: "Umumiy ko'rsatkichlar"        }, firstKey: "pulse"             },
  { label: { ru: "Состав крови",        uz: "Qon tarkibi"                  }, firstKey: "waterPercentage"   },
  { label: { ru: "Белки крови",         uz: "Qon oqsillari"                }, firstKey: "glutathione"       },
  { label: { ru: "Азотистый обмен",     uz: "Azot almashinuvi"             }, firstKey: "residualNitrogen"  },
  { label: { ru: "Липиды и кислоты",    uz: "Lipidlar va kislotalar"       }, firstKey: "ketoneBodies"      },
  { label: { ru: "Витамины и минералы", uz: "Vitaminlar va minerallar"     }, firstKey: "carotene"          },
  { label: { ru: "Моча",               uz: "Siydik"                        }, firstKey: "urineColor"        },
  { label: { ru: "Кал",                uz: "Najas"                         }, firstKey: "fecesSmell"        },
  { label: { ru: "Выделения слизистых", uz: "Shilliq parda ajralmalari"    }, firstKey: "mucosaOral"        },
  { label: { ru: "Общее состояние",     uz: "Umumiy holat"                 }, firstKey: "rumination"        },
  { label: { ru: "Кожа и шерсть",      uz: "Teri va jun"                  }, firstKey: "wool"              },
  { label: { ru: "Лимфоузлы",          uz: "Limfa tugunlari"              }, firstKey: "lymphSize"         },
];

function formatPercent(probability: number): string {
  const pct = probability * 100;
  if (pct >= 1) return String(Math.round(pct));
  if (pct >= 0.01) return pct.toFixed(2);
  if (pct >= 0.000001) return pct.toPrecision(2);
  return "0";
}

function getSeverityBadge(percent: number) {
  if (percent >= 70) return { labelKey: "prediction.severityHigh" as const, className: "bg-red-100 text-red-700 border-red-200" };
  if (percent >= 50) return { labelKey: "prediction.severityMedium" as const, className: "bg-orange-100 text-orange-700 border-orange-200" };
  if (percent >= 30) return { labelKey: "prediction.severityModerate" as const, className: "bg-yellow-100 text-yellow-700 border-yellow-200" };
  return { labelKey: "prediction.severityLow" as const, className: "bg-green-100 text-green-700 border-green-200" };
}

function FeedbackForm({ predictionId, role, userData, onSubmitted }: {
  predictionId: string;
  role: string;
  userData: any;
  onSubmitted: () => void;
}) {
  const { t } = useI18n();
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
      const msg = e?.response?.data?.message ?? e?.message ?? t("prediction.sendError");
      createToast(Array.isArray(msg) ? msg.join(", ") : msg, "WARNING");
    }
  };

  return (
    <>
      <div>
        <p className="text-sm text-muted-foreground mb-2">{t("prediction.ratingLabel")}</p>
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
        <p className="text-sm text-muted-foreground mb-2">{t("prediction.commentLabel")}</p>
        <Textarea
          placeholder={t("prediction.commentPlaceholder")}
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
        {isPending ? t("prediction.sending") : t("prediction.send")}
      </Button>
    </>
  );
}

type Props = { id: string };

export function PredictionDashboard({ id }: Props) {
  const { locale, t } = useI18n();
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
  const isHealthy = allDiagnoses.length > 0 && topDiagnosis.probability * 100 < 1;
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
          <p>{t("prediction.notFormed")}</p>
          <p className="text-sm mt-1">{t("prediction.submitHint")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* Top diagnosis */}
      {isHealthy ? (
        <Card className="shadow-none rounded border-l-4 border-l-green-500">
          <CardContent className="py-0">
            <p className="text-xs text-muted-foreground mb-2">{t("prediction.topDiagnosis")}</p>
            <div className="flex items-end gap-3 flex-wrap">
              <Brain className="size-6 text-green-500 shrink-0" />
              <span className="text-xl font-bold text-green-700">{t("prediction.healthy")}</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {t("prediction.healthyDesc")}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-none rounded border-l-4 border-l-red-500">
          <CardContent className="py-0">
            <p className="text-xs text-muted-foreground mb-2">{t("prediction.topDiagnosis")}</p>
            <div className="flex items-end gap-3 flex-wrap">
              <Brain className="size-6 text-red-500 shrink-0" />
              <span className="text-xl font-bold">{topDiagnosis?.name ?? "—"}</span>
              <Badge className={topBadge.className}>
                {topDiagnosis ? formatPercent(topDiagnosis.probability) : "0"}% — {t(topBadge.labelKey)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Probable diagnoses | Input values */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        <Card className="shadow-none rounded flex flex-col max-h-[520px]">
          <CardHeader className="shrink-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <TrendingUp className="size-5 md:size-6" />
              {t("prediction.probableDiagnoses")} ({allDiagnoses.length})
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
                        {t(badge.labelKey)}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.percent > 0 ? item.percent : item.probability > 0 ? 0.3 : 0} className="h-1 mt-0.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-none rounded flex flex-col max-h-[520px]">
          <CardHeader className="shrink-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <FlaskConical className="size-5 md:size-6" />
              {t("prediction.inputValues")} ({inputEntries.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pb-3">
            {inputEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("prediction.noData")}</p>
            ) : (
              <div className="space-y-0">
                {inputEntries.map(([key, value], index) => {
                  const meta = INPUT_VECTOR_META[key];
                  const group = INPUT_VECTOR_GROUPS.find((g) => g.firstKey === key);
                  const fieldName = NULL_FIELD_LABELS[key]?.[locale] ?? NULL_FIELD_LABELS[key]?.ru ?? key;
                  return (
                    <div key={key}>
                      {group && (
                        <div className={`flex items-center gap-2 ${index === 0 ? "mb-1" : "mt-3 mb-1"}`}>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60 shrink-0">
                            {group.label[locale] ?? group.label.ru}
                          </span>
                          <div className="flex-1 h-px bg-border/40" />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2 py-[5px] border-b border-border/30 last:border-0">
                        <span className="text-sm text-muted-foreground leading-none">
                          <span className="tabular-nums text-muted-foreground/50 mr-1">{index + 1}.</span>
                          {fieldName}
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

      {/* Comments */}
      <Card className="shadow-none rounded">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <MessageSquare className="size-5 md:size-6" />
            {t("prediction.comments")}
            {(feedbacksData?.meta?.total ?? 0) > 0 && (
              <Badge variant="outline" className="ml-1 text-xs">{feedbacksData!.meta.total}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {(feedbacksData?.data ?? []).length > 0 && (
            <div className="space-y-3 mb-2">
              {feedbacksData!.data.map((fb) => {
                const author = fb.veterinarianId
                  ? t("prediction.authorVeterinarian")
                  : fb.adminId
                  ? t("prediction.authorAdmin")
                  : t("prediction.authorUser");
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
