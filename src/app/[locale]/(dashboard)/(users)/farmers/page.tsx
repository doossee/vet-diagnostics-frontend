"use client";

import { useMemo } from "react";
import type { User } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useCrud } from "@/shared/hooks/use-crud";
import { UserForm, UserSchema } from "@/features/users";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { DataTable } from "@/shared/components/data-table";
import { Modal } from "@/shared/components/elements/modal";
import { createUserColumns, UserFilters } from "@/entities/users";
import { useGetFarmers } from "@/entities/users/services/queries";
import { UsersQueryParamKeys } from "@/entities/users/utils/constants/users-query-param-keys";
import { useCreateFarmer, useDeleteFarmer, useUpdateFarmer } from "@/entities/users/services/mutations";
import { ExcelDownloadButton } from "@/shared/components/excel-download-button";

export default function Farmers() {
  const { t, locale } = useI18n();
  const { userData } = useAuthData();

  const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<User, UserSchema, UserSchema>({
    createMutation: useCreateFarmer,
    updateMutation: useUpdateFarmer,
    removeMutation: useDeleteFarmer,
    // extraOnCreate: (values) => {
    //   if (userData?.role === "VETERINARIAN") values.veterinarianId = userData?.userId!;
    //   return values;
    // },
    extraOnCreate(values) {
      return { ...values, role: "FARMER" }
    }
  });

  const columns = useMemo(() => createUserColumns(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete]);

  return (
    <div>
      {/* <UserFilters /> */}

      <DataTable
        columns={columns}
        queryFunction={useGetFarmers}
        filterQueryParamKeys={UsersQueryParamKeys}
        topSlot={<div className="flex gap-2"><ExcelDownloadButton importUrl="/users/import" />{createButton(t("users.createFarmer"))}</div>}
      />

      <Modal
        open={dialog}
        onClose={handleClose}
        widthClassName="max-w-[600px]!"
        title={t(editedItem ? "users.editFarmer" : "users.createFarmer")}>
        <UserForm
          onSubmit={onSubmit}
          itemId={editedItem?.id}
          showVeterinarians={userData?.role === "ADMIN"}
          defaultValues={editedItem ? editedItem : (undefined as any)} />
      </Modal>
    </div>
  );
}
