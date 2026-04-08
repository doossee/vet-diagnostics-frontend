"use client";

import { AnimalInfoTable } from "@/features/animals/components/info-tables/animal-info-table";
import SessionsTable from "../sessions/sessions-table";

export function AnimalDashboard({ id }: { id: string }) {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimalInfoTable id={id} />
        
        <SessionsTable animalId={id} className="col-span-1 md:col-span-2" />
      </div>
    </div>
  );
}
