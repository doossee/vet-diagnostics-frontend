'use client'

import { useMemo } from 'react'
import type { DungColor } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from "@/shared/hooks/use-i18n"
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createDungColorColums } from '@/entities/dung-colors'
import { DungColorForm, DungColorSchema } from '@/features/dung-colors'
import { useGetDungColors } from '@/entities/dung-colors/services/queries'
import { useCreateDungColor, useDeleteDungColor, useUpdateDungColor } from '@/entities/dung-colors/services/mutations'

export default function DungColors() {
    const { t } = useI18n()
    
    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<DungColor, DungColorSchema, DungColorSchema>({
        createMutation: useCreateDungColor,
        updateMutation: useUpdateDungColor,
        removeMutation: useDeleteDungColor,
    })

    const columns = useMemo(() => createDungColorColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetDungColors}
                topSlot={createButton(t("management.dungColorCreate"))}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem? "management.editColor" : 'management.createColor')}>
                <DungColorForm onSubmit={onSubmit} defaultValues={editedItem?editedItem:undefined as any} />
            </Drawer>
        </div>
    )
}