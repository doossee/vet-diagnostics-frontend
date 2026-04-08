"use client";

import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { DiseaseInfoTable } from "@/features/animals/components/info-tables/disease-info-table";
import { BloodExamInfoTable } from "@/features/animals/components/info-tables/blood-exam-info-table";
import { ClinicExamInfoTable } from "@/features/animals/components/info-tables/clinic-exam-info-table";
import { MucosaExamInfoTable } from "@/features/animals/components/info-tables/mucosa-exam-info-table";
import { UrineExamInfoTable } from "@/features/animals/components/info-tables/urine-exam-info-table";
import { FecesExamInfoTable } from "@/features/animals/components/info-tables/feces-examp-info-table";
import { ProphylaxisInfoTable } from "@/features/animals/components/info-tables/prophylaxis-info-table";
import { PredictInfoTable } from "@/features/animals/components/info-tables/predict-info-table";
import { useGetMedicalSessionById } from "@/entities/sessions/services/queries";
import { MucosaExamsTable } from "../mucosa-exams/mucosa-exams-table";

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
        <PredictInfoTable id={id} />

        {/* <DiseaseInfoTable data={data.} isLoading={isLoading} onCreate={handleOpenRoute} /> */}

        {/* <MucosaExamInfoTable id={id} onCreate={handleOpenRoute} /> */}

        {/* <ProphylaxisInfoTable id={id} onCreate={handleOpenRoute} /> */}

        <FecesExamInfoTable data={data?.fecesExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <div></div>

        <UrineExamInfoTable data={data?.urineExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <ClinicExamInfoTable data={data?.clinicalExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <BloodExamInfoTable data={data?.bloodExam} isLoading={isLoading} onCreate={handleOpenRoute} />

        <MucosaExamsTable animalId={data?.animalId} sessionId={data?.id} className="col-span-1 md:col-span-2 lg:col-span-3" />
      </div>
    </div>
  );
}
