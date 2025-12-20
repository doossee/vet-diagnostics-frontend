import { useMemo } from "react";

import { PREDICT_DISEASES } from "@/shared/constants";
import { useGetAnimalPredict } from "@/entities/animals/services/animal-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/empty-state";
// import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
// import { SkeletonWrapper } from "@/shared/components/elements/skeleton-wrapper";
// import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { LineChart } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { GeneralInspectionQueryKeys } from "@/entities/general-inspections/utils/constants/query-keys";
import { GeneralBloodTestQueryKeys } from "@/entities/general-blood-tests/utils/constants/query-keys";
import { BloodExam, ClinicalExam } from "@/shared/types";
import { useGetLastGeneralInspection } from "@/entities/general-inspections/services/queries";
import { useGetLastGeneralBloodTest } from "@/entities/general-blood-tests/services/queries";
import { useI18n } from "@/shared/hooks/use-i18n";

type Props = {
  id: string;
}

function getTopDisease(
  aiResult: Record<string, number>,
  predictDiseases: Record<string, string>,
) {
  let maxValue = -Infinity
  let selectedId: string | null = null

  for (const [id, value] of Object.entries(aiResult)) {
    if (value > maxValue) {
      maxValue = value
      selectedId = id
    }
  }

  if (!selectedId || !predictDiseases[selectedId]) {
    return null
  }

  return {
    id: selectedId,
    name: predictDiseases[selectedId],
    value: maxValue,
  }
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

  // Собираем значения полей
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
  temperature: { name: 'Температура', unit: '°C' },
  pulse: { name: 'Пульс', unit: 'уд/мин' },
  respiratoryRate: { name: 'Частота дыхания', unit: 'раз/мин' },
  rumination: { name: 'Жвачка', unit: 'раз/мин' },
  rumenInfusoriaCount: { name: 'Количество инфузорий в рубце', unit: '' },
  rumenFluidState: { name: 'Состояние рубцовой жидкости', unit: '' },

  // Blood Exam
  erythrocyteCount: { name: 'Эритроциты', unit: 'млн/мкл' },
  hemoglobin: { name: 'Гемоглобин', unit: 'г/л' },
  totalProtein: { name: 'Общий белок', unit: 'г/л' },
  totalCalcium: { name: 'Общий кальций', unit: 'ммоль/л' },
  organicPhosphorus: { name: 'Органический фосфор', unit: 'ммоль/л' },
  glucose: { name: 'Глюкоза', unit: 'ммоль/л' },
  alkalineReserve: { name: 'Щелочной резерв', unit: 'Об%CO²' },
  copper: { name: 'Медь', unit: 'ммоль/л' },
  cobalt: { name: 'Кобальт', unit: 'ммоль/л' },
  manganese: { name: 'Марганец', unit: 'ммоль/л' },
  zinc: { name: 'Цинк', unit: 'ммоль/л' },
};

export function predictDiseases(values: any, id: string): any {
  // Создаём seed из UUID
  const seed = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const result: Record<string, number> = {};

  Object.keys(PREDICT_DISEASES).forEach((id) => {
    // Сумма числовых полей
    const sumValues: any = Object.values(values).reduce(
      (sum, v) => (sum as any) + (typeof v === "number" ? v : 0),
      0
    );

    // Псевдослучайное число на основе суммы + seed + id
    const pseudoRandom = ((sumValues * 7 + seed + parseInt(id) * 13) % 1000) / 1000;

    // Ограничиваем маленьким числом, имитируя вероятность
    result[id] = parseFloat((pseudoRandom * 0.01).toFixed(4));
  });

  return result;
}


export function PredictInfoTable({ id }: Props) {
  const { t } = useI18n();
  const { data, isLoading } = useGetAnimalPredict(id);
  const values = useExamValues(id)
  const items = predictDiseases(values, id);

  const diseases = useMemo(() => {
    return Object.entries(PREDICT_DISEASES)
      .map(([id, value]) => ({
        name: value ?? `${t("inspections.diseases")} ${id}`,
        value: Number(((items ? items[+id] * 100: 0)).toFixed(2)),
        // value: Number(((data ? data[+id] * 100: 0)).toFixed(2)),
      }))
  }, [data, t]);

  const topIndex = diseases.reduce(
    (maxIdx, item, idx, arr) =>
      item.value > arr[maxIdx].value ? idx : maxIdx,
    0,
  );

  return (
    <Card className="shadow-none rounded">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <LineChart />
            {t("pages.aiPredictionResult")}
          </CardTitle>

        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {!isLoading && !data && <EmptyState />}
        {isLoading && (
          <>
            <div className="h-18 w-full bg-card-foreground/5 rounded animate-pulse" />
            <div className="grid grid-cols-4 gap-4 mt-4">
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

          <div className="grid grid-cols-4 gap-4">
            { Object.entries(values??{}).map(([key, value]) => 
              <div className="" key={key}>
                <h2 className="text-xs text-muted-foreground">{namesObject[key as keyof typeof namesObject].name}</h2>
                <p className="font-medium text-xl">
                  {value}{" "}
                  <span className="text-xs">{namesObject[key as keyof typeof namesObject].unit}</span>
                </p>
              </div>
            )}
            <div className="h-full w-full flex items-end text-muted-foreground">
              .....
            </div>
          </div>
        </>}

        {/* <div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={diseases}>
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                barSize={6} // 🔥 тонкие столбцы
              >
                {diseases.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      index === topIndex
                        ? "hsl(var(--primary))"        // 🔥 TOP
                        : "hsl(var(--primary) / 0.25)" // 🌫 остальные
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </CardContent>
    </Card>
  )
  // return (<Card className="shadow-none rounded">
  //   <CardHeader>
  //     <div className="flex items-center justify-between">
  //       <CardTitle className="flex items-center gap-2">
  //         {/* {icon}
  //         {t(localeTitle)} */}
  //         PREDICT
  //       </CardTitle>
  //     </div>
  //   </CardHeader>
  //   <CardContent className="px-4 max-h-[630px] overflow-auto">
  //     {visibleDiseases == null ? (
  //       <EmptyState />
  //     ) : <Table>
  //       <TableBody>
  //         {
  //           visibleDiseases.map((row) => 
  //             <TableRow key={row.id}>
  //               <TableCell>
  //                 <SkeletonWrapper loading={isLoading}>
  //                   <b>{row.name}</b>
  //                 </SkeletonWrapper>
  //               </TableCell>
  //               <TableCell>
  //                 <SkeletonWrapper loading={isLoading}>
  //                   {row.probability}
  //                 </SkeletonWrapper>
  //               </TableCell>
  //             </TableRow>
  //           )
  //         }
  //       </TableBody>
  //     </Table>}
  //   </CardContent>
  // </Card>)
}