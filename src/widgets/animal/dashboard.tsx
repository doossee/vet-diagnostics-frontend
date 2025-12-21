"use client";

import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { AnimalInfoTable } from "@/features/animals/components/info-tables/animal-info-table";
import { DiseaseInfoTable } from "@/features/animals/components/info-tables/disease-info-table";
import { BloodExamInfoTable } from "@/features/animals/components/info-tables/blood-exam-info-table";
import { ClinicExamInfoTable } from "@/features/animals/components/info-tables/clinic-exam-info-table";
import { MucosaExamInfoTable } from "@/features/animals/components/info-tables/mucosa-exam-info-table";
import { UrineExamInfoTable } from "@/features/animals/components/info-tables/urine-exam-info-table";
import { FecesExamInfoTable } from "@/features/animals/components/info-tables/feces-examp-info-table";
import { ProphylaxisInfoTable } from "@/features/animals/components/info-tables/prophylaxis-info-table";
import { PredictInfoTable } from "@/features/animals/components/info-tables/predict-info-table";
import { useGetAnimal } from "@/entities/animals/services/animal-queries";

export function AnimalDashboard({ id }: { id: string }) {
  const { data } = useGetAnimal(id)
  const { setMany } = useSearchQueryParams();
  
  const handleOpenRoute = (route: string, createNew?: boolean) => {
    setMany({
      animalId: id,
      new: createNew,
      animalTypeId: data?.animalTypeId
    }, route)
  }

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <AnimalInfoTable id={id} />

        <PredictInfoTable id={id} />

        <DiseaseInfoTable id={id} onCreate={handleOpenRoute} />

        <MucosaExamInfoTable id={id} onCreate={handleOpenRoute} />

        <ProphylaxisInfoTable id={id} onCreate={handleOpenRoute} />

        <FecesExamInfoTable id={id} onCreate={handleOpenRoute} />

        <UrineExamInfoTable id={id} onCreate={handleOpenRoute} />

        <ClinicExamInfoTable id={id} onCreate={handleOpenRoute} />

        <BloodExamInfoTable id={id} onCreate={handleOpenRoute} />
      </div>
    </div>
  );
}
