"use client";

import { useMemo } from "react";
import type { User } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { UserForm, UserSchema } from "@/features/users";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createUserColumns, UserFilters } from "@/entities/users";
import { useGetVeterinarians } from "@/entities/users/services/queries";
import { useUpdateVeterinarian, useCreateVeterinarian, useDeleteVeterinarian } from "@/entities/users/services/mutations";
import { UsersQueryParamKeys } from "@/entities/users/utils/constants/users-query-param-keys";

export default function Veterinarians() {
  const { t, locale } = useI18n();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<User, UserSchema, UserSchema>({
    createMutation: useCreateVeterinarian,
    updateMutation: useUpdateVeterinarian,
    removeMutation: useDeleteVeterinarian,
    extraOnCreate: (values) => ({
      ...values,
      role: "VETERINARIAN",
    }),
    extraOnUpdate: (values) => {
      const { password, ...others } = values;
      if (password?.trim()) Object.assign(others, { password });
      return others;
    },
  });

  const columns = useMemo(() => createUserColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      <UserFilters />

      <DataTable
        columns={columns}
        queryFunction={useGetVeterinarians}
        filterQueryParamKeys={UsersQueryParamKeys}
        topSlot={createButton(t("users.createVeterinarian"))}
      />

      <Modal open={dialog} onClose={handleClose} widthClassName="max-w-[650px]!" title={t(editedItem ? "users.editVeterinarian" : "users.createVeterinarian")}>
        <UserForm itemId={editedItem?.id} onSubmit={onSubmit} defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}
