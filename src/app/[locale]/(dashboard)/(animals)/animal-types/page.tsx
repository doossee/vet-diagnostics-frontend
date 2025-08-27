'use client'

import { useMemo } from 'react'
import type { AnimalType } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from '@/shared/hooks/use-i18n'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createAnimalTypeColums } from '@/entities/animal-types'
import { AnimalTypeSchema, AnimalTypeForm } from '@/features/animal-types'
import { useGetAnimalTypes } from '@/entities/animal-types/services/animal-type-queries'
import { useCreateAnimalType, useDeleteAnimalType, useUpdateAnimalType } from '@/entities/animal-types/services/animal-type-mutations'

export default function AnimalTypes() {
    const { t } = useI18n()

    const {
        dialog,
        editedItem,
        onSubmit,
        handleClose,
        handleDelete,
        createButton,
        handleEditItem
    } = useCrud<AnimalType,AnimalTypeSchema, AnimalTypeSchema>({
        createMutation: useCreateAnimalType,
        updateMutation: useUpdateAnimalType,
        removeMutation: useDeleteAnimalType,
    })

    const columns = useMemo(() => createAnimalTypeColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetAnimalTypes}
                topSlot={createButton(t('animalTypes.createButton'))} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem?'animalTypes.editAnimalType':'animalTypes.createAnimalType')}>
                <AnimalTypeForm
                    onSubmit={onSubmit}
                    defaultValues={editedItem !== null ? editedItem : undefined} />
            </Drawer>
        </div>
    )
}