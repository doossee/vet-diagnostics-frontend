"use client";

import { useMemo } from "react";
import type { Animal } from "@/shared/types";
import { useRouter } from "@/shared/i18n/routing";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { routes } from "@/shared/constants/routes";
import { DataTable } from "@/shared/components/data-table";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { Modal } from "@/shared/components/elements/modal";
import { AnimalForm, AnimalSchema } from "@/features/animals";
import { AnimalFilters, createAnimalColums } from "@/entities/animals";
import { useGetAnimals } from "@/entities/animals/services/animal-queries";
import { queryParamKeys } from "@/entities/animals/utils/constants/query-param-keys";
import { useCreateAnimal, useDeleteAnimal, useUpdateAnimal } from "@/entities/animals/services/animal-mutations";

export default function Animals() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const { userData } = useAuthData();

  const { dialog, editedItem, handleClose, createButton, onSubmit, handleDelete, handleEditItem } = useCrud<Animal, AnimalSchema, AnimalSchema>({
    createMutation: useCreateAnimal,
    removeMutation: useDeleteAnimal,
    updateMutation: useUpdateAnimal,

    extraOnUpdate: ({ farmerId, ...others }) => others,
    extraOnCreate: (values) => {
      if (userData?.userRole === "FARMER") Object.assign(values, { farmerId: userData?.userId! });
      return values;
    },
  });

  const columns = useMemo(() => createAnimalColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  const handleNavigate = (item: Animal) => {
    router.push(routes.ANIMALS.ID(item.id));
  };

  return (
    <div>
      <AnimalFilters />

      <DataTable
        columns={columns}
        onRowClick={handleNavigate}
        queryFunction={useGetAnimals}
        filterQueryParamKeys={queryParamKeys}
        topSlot={createButton(t("animals.createButton"))}
      />

      <Modal open={dialog} onClose={handleClose} widthClassName="max-w-[650px]!" title={t(editedItem ? "animals.editAnimal" : "animals.createAnimal")}>
        <AnimalForm onSubmit={onSubmit} showFarmer={userData?.userRole !== "FARMER"} defaultValues={editedItem ? editedItem : undefined} />
      </Modal>
    </div>
  );
}