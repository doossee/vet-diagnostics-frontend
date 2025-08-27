'use client'

import { useMemo } from 'react'
import type { Breed } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from "@/shared/hooks/use-i18n"
import { createBreedColums } from '@/entities/breeds'
import { DataTable } from '@/shared/components/data-table'
import { BreedForm, BreedSchema } from '@/features/breeds'
import { Drawer } from '@/shared/components/elements/drawer'
import { useGetBreeds } from '@/entities/breeds/services/breed-queries'
import { useCreateBreed, useDeleteBreed, useUpdateBreed } from '@/entities/breeds/services/breed-mutations'

export default function Breeds() {
    const { t } = useI18n()

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit, setDialog } = useCrud<Breed, BreedSchema, BreedSchema>({
        createMutation: useCreateBreed,
        updateMutation: useUpdateBreed,
        removeMutation: useDeleteBreed,
    })

    const columns = useMemo(() => createBreedColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetBreeds}
                topSlot={createButton(t('management.createBreed'))}
            />

            <Drawer
                open={dialog}
                title={t(editedItem? "management.editBreed" : 'management.createBreed')}
                onClose={handleClose}>
                
                <BreedForm onSubmit={onSubmit} defaultValues={editedItem?editedItem:undefined as any} />
            </Drawer>
        </div>
    )
}