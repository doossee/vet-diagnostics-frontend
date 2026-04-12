"use client";

import { AnimalInfoTable } from "@/features/animals/components/info-tables/animal-info-table";
import SessionsTable from "../sessions/sessions-table";
import { DiseaseInfoTable } from "@/features/animals/components/info-tables/disease-info-table";
import { ProphylaxisInfoTable } from "@/features/animals/components/info-tables/prophylaxis-info-table";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimalInfoTable id={id} />

        <ProphylaxisInfoTable id={id} onCreate={handleOpenRoute} />

        <SessionsTable animalId={id} className="col-span-full" />
      </div>
    </div>
  );
}
