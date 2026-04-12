"use client";

import { PawPrint } from "lucide-react";

import { InfoTable } from "./info-table";
import { createAnimalColumns } from "@/entities/animals";
import { useGetAnimal } from "@/entities/animals/services/animal-queries";

type Props = {
  id: string
}

export function AnimalInfoTable({ id }: Props) {
  const { data, isLoading } = useGetAnimal(id);

  return <InfoTable
    hideCreateButton
    icon={<PawPrint className="size-5 md:size-6" />}
    localeTitle="animals.animalInfo"
    data={data}
    isLoading={isLoading}
    createColumns={createAnimalColumns}
  />
}