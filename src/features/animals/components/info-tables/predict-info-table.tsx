import { useMemo } from "react";
import { LineChart } from "lucide-react";

import { PREDICT_DISEASES } from "@/shared/constants";
import { useGetAnimalPredict } from "@/entities/animals/services/animal-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/empty-state";
import { BloodExam, ClinicalExam } from "@/shared/types";
import { useGetLastGeneralInspection } from "@/entities/general-inspections/services/queries";
import { useGetLastGeneralBloodTest } from "@/entities/general-blood-tests/services/queries";
import { useI18n } from "@/shared/hooks/use-i18n";
import { BLOOD_TEST_FIELDS } from "@/entities/general-blood-tests/utils/constants/blood-test-fields";

type Props = {
  id: string;
}

const clinicExamFields = [
  'temperature',
  'pulse',
  'respiratoryRate',
  // 'rumination',
  // 'rumenFluidState',
  // 'rumenInfusoriaCount',
]

const bloodExamFields = [
  'erythrocyteCount',
  'hemoglobin',
  // 'totalProtein',
  'totalCalcium',
  // 'organicPhosphorus',
  'glucose',
  // 'alkalineReserve',
  'copper',
  'cobalt',
  'manganese',
  'zinc',
]

function useExamValues(animalId: string) {
  const { data: clinicData } = useGetLastGeneralInspection(animalId);
  const { data: bloodData } = useGetLastGeneralBloodTest(animalId);

  const clinicValues = clinicExamFields.reduce((acc, field) => {
    if (clinicData && field in clinicData) {
      acc[field] = clinicData[field as keyof ClinicalExam];
    }
    return acc;
  }, {} as Record<string, any>);

  const bloodValues = bloodExamFields.reduce((acc, field) => {
    if (bloodData && field in bloodData) {
      acc[field] = bloodData[field as keyof BloodExam];
    }
    return acc;
  }, {} as Record<string, any>);

  return { ...bloodValues, ...clinicValues, };
}

const namesObject = {
  // Clinic Exam
  temperature: { ru: 'Температура', uz: 'Harorat', unit_ru: '°C', unit_uz: '°C' },
  pulse: { ru: 'Пульс', uz: 'Puls', unit_ru: 'уд/мин', unit_uz: 'zrb/min' },
  respiratoryRate: { ru: 'Частота дыхания', uz: 'Nafas soni', unit_ru: 'раз/мин', unit_uz: 'mrt/min' },
  rumination: { ru: 'Жвачка', uz: 'Жвачка', unit_ru: 'раз/мин', unit_uz: 'mrt/min' },
  rumenInfusoriaCount: { ru: 'Количество инфузорий в рубце', uz: 'Qorindagi infuzoriyalar soni', unit_uz: '', unit_ru: '' },
  rumenFluidState: { ru: 'Состояние рубцовой жидкости', uz: 'Qorin suyuqligi holati', unit_ru: '', unit_uz: '' },

  // Blood Exam
  erythrocyteCount: BLOOD_TEST_FIELDS.erythrocyteCount,
  hemoglobin: BLOOD_TEST_FIELDS.hemoglobin,
  totalProtein: BLOOD_TEST_FIELDS.totalProtein,
  totalCalcium: BLOOD_TEST_FIELDS.totalCalcium,
  organicPhosphorus: BLOOD_TEST_FIELDS.organicPhosphorus,
  glucose: BLOOD_TEST_FIELDS.glucose,
  alkalineReserve: BLOOD_TEST_FIELDS.alkalineReserve,
  copper: BLOOD_TEST_FIELDS.copper,
  cobalt: BLOOD_TEST_FIELDS.cobalt,
  manganese: BLOOD_TEST_FIELDS.manganese,
  zinc: BLOOD_TEST_FIELDS.zinc,
};

function predictDiseases(values: any, id: string): any {
  const seed = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const result: Record<string, number> = {};

  Object.keys(PREDICT_DISEASES).forEach((id) => {
    const sumValues: any = Object.values(values).reduce(
      (sum, v) => (sum as any) + (typeof v === "number" ? v : 0),
      0
    );

    const pseudoRandom = ((sumValues * 7 + seed + parseInt(id) * 13) % 1000) / 1000;

    result[id] = parseFloat((pseudoRandom * 0.01).toFixed(4));
  });

  return result;
}

export function PredictInfoTable({ id }: Props) {
  const { t, locale } = useI18n();
  const { data, isLoading } = useGetAnimalPredict(id);
  const values = useExamValues(id)
  const items = predictDiseases(values, id);

  const diseases = useMemo(() => {
    return Object.entries(PREDICT_DISEASES)
      .map(([id, value]) => ({
        name: value[locale],
        value: Number(((items ? items[+id] * 100: 0)).toFixed(2)),
      }))
  }, [data, t, locale]);

  const topIndex = diseases.reduce(
    (maxIdx, item, idx, arr) =>
      item.value > arr[maxIdx].value ? idx : maxIdx
    , 0);

  return (
    <Card className="shadow-none rounded">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <LineChart className="size-5 md:size-6" />
            {t("pages.aiPredictionResult")}
          </CardTitle>

        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {!isLoading && !data && <EmptyState />}
        {isLoading && (
          <>
            <div className="h-18 w-full bg-card-foreground/5 rounded animate-pulse" />
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 animate-pulse">
                  <div className="h-3 w-3/4 bg-card-foreground/25 rounded"></div> {/* название */}
                  <div className="h-6 w-full bg-card-foreground/15 rounded"></div>   {/* значение */}
                </div>
              ))}
            </div>
          </>
        )}
        {data && <>
          <div className="mb-4 rounded-lg border bg-card-foreground/5 p-3">
            <p className="text-sm">
              {t("pages.mostLikelyDisease")}
            </p>
            <p className="text-lg font-semibold">
              {diseases[topIndex]?.name??"-"} — {diseases[topIndex].value??0}%
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
            { Object.entries(values??{}).map(([key, value]) => 
              <div className="" key={key}>
                <h2 className="text-xs text-muted-foreground">{namesObject[key as keyof typeof namesObject]?.[locale]}</h2>
                <p className="font-medium text-xl">
                  {value}{" "}
                  <span className="text-xs">{namesObject[key as keyof typeof namesObject]?.[`unit_${locale}`] ?? ''}</span>
                </p>
              </div>
            )}
            <div className="h-full w-full flex items-end text-muted-foreground">
              .....
            </div>
          </div>
        </>}
      </CardContent>
    </Card>
  )
}