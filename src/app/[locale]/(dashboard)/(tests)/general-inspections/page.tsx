'use client'

import { useMemo } from 'react'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { GeneralInspection } from '@/shared/types'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createGeneralInspectionColums } from '@/entities/general-inspections'
import { useAnimalColors, useEyelids, useLeatherCovers } from '@/shared/hooks/queries'
import { useGetGeneralInspections } from '@/entities/general-inspections/services/queries'
import { GeneralInspectionForm, GeneralInspectionSchema } from '@/features/general-inspections'
import { useCreateGeneralInspection, useDeleteGeneralInspection, useUpdateGeneralInspection } from '@/entities/general-inspections/services/mutations'
// TODO: fix
export default function GeneralInspections() {
    const { t, locale } = useI18n()

    const { eyeLids } = useEyelids()
    const { animalColors } = useAnimalColors()
    const { leatherCovers } = useLeatherCovers()

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<GeneralInspection, GeneralInspectionSchema, GeneralInspectionSchema>({
        createMutation: useCreateGeneralInspection,
        updateMutation: useUpdateGeneralInspection,
        removeMutation: useDeleteGeneralInspection,
    })

    const columns = useMemo(() => createGeneralInspectionColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetGeneralInspections}
                topSlot={createButton(t("inspections.createGeneralInspections"))} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName='bg-card max-w-[600px]!'
                title={t(editedItem?"inspections.editGeneralInspections":"inspections.createGeneralInspections")}>
                <GeneralInspectionForm
                    eyeLids={eyeLids}
                    onSubmit={onSubmit}
                    animalColors={animalColors}
                    leatherCovers={leatherCovers}
                    defaultValues={editedItem?editedItem:undefined as any} />
            </Drawer>
        </div>
    )
}