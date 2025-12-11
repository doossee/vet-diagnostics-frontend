import { Plus } from "lucide-react";
import { UpdateBody } from "@/shared/types";
import { Button } from "../components/ui/button";
import { useI18n } from "@/shared/hooks/use-i18n";
import { ALERT_MESSAGES } from "@/shared/constants";
import { ReactNode, useCallback, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

interface UseCrudOptions<T, CreateValues, UpdateValues> {
  createMutation: () => UseMutationResult<any, any, CreateValues>;
  updateMutation: () => UseMutationResult<any, any, UpdateBody<UpdateValues>>;
  removeMutation: () => UseMutationResult<any, any, number | string>;
  extraOnCreate?: (values: CreateValues) => Partial<T | CreateValues> | void;
  extraOnAfterCreate?: (values: any) => any;
  extraOnUpdate?: (values: UpdateValues) => Partial<T | CreateValues> | void;
  extraOnClose?: () => void;
  extraOnEdit?: (item: T) => void;

  dialogValue?: boolean;
}

export function useCrud<T extends { id?: number | string }, CreateValues, UpdateValues>(options: UseCrudOptions<T, CreateValues, UpdateValues>) {
  const { locale } = useI18n();
  const [editedItem, setEditedItem] = useState<T | null>(null);
  const [dialog, setDialog] = useState(options.dialogValue || false);

  const create = options.createMutation();
  const update = options.updateMutation();
  const remove = options.removeMutation();

  async function onSubmit(values: CreateValues | UpdateValues) {
    try {
      if (editedItem?.id) {
        const newValues = options.extraOnUpdate ? options.extraOnUpdate(values as UpdateValues) : values;
        await update.mutateAsync({ id: editedItem.id, body: newValues } as any);
      } else {
        const newValues = options.extraOnCreate ? options.extraOnCreate(values as CreateValues) : values;
        await create.mutateAsync(newValues as any);
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number | string) {
    try {
      if (!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return;
      await remove.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditItem(item: T) {
    setDialog(true);
    setEditedItem(item);
    options?.extraOnEdit?.(item);
  }

  function handleClose() {
    setDialog(false);
    setEditedItem(null);
    options?.extraOnClose?.();
  }

  const createButton = useCallback(
    (children: ReactNode) => {
      return (
        <Button onClick={() => setDialog(true)} size={"default"} className="mt-0! w-full sm:w-fit">
          <Plus /> {children}
        </Button>
      );
    },
    [setDialog],
  );

  return {
    dialog,
    editedItem,

    handleDelete,
    handleEditItem,
    onSubmit,

    setDialog,
    handleClose,

    createButton,
  };
}
