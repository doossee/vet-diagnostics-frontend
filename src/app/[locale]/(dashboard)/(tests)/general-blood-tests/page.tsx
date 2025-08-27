'use client'

import { useMemo } from 'react'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import type { GeneralBloodTest } from "@/shared/types"
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { useSearchQueryParams } from '@/shared/hooks/use-query-params'
import { createGeneralBloodTestColums } from '@/entities/general-blood-tests'
import { useGetGeneralBloodTests } from '@/entities/general-blood-tests/services/queries'
import { GeneralBloodTestForm, GeneralBloodTestSchema, generalBloodTestValues } from '@/features/general-blood-tests'
import { useCreateGeneralBloodTest, useDeleteGeneralBloodTest, useUpdateGeneralBloodTest } from '@/entities/general-blood-tests/services/mutations'

export default function GeneralBloodTests() {
    const { t, locale } = useI18n()
    const { get, set, remove } = useSearchQueryParams()

    const newAnimal = get('new')
    const animalId = get('animalId', true)

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<GeneralBloodTest, GeneralBloodTestSchema, GeneralBloodTestSchema>({
        dialogValue: !!newAnimal,
        createMutation: useCreateGeneralBloodTest,
        updateMutation: useUpdateGeneralBloodTest,
        removeMutation: useDeleteGeneralBloodTest,
        extraOnClose: () => newAnimal && (animalId ? set('animalId', animalId) : remove('animalId'))
    })

    const columns = useMemo(() => createGeneralBloodTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetGeneralBloodTests}
                topSlot={createButton(t("inspections.createBloodTest"))} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName='max-w-[650px]!'
                title={t(editedItem?"inspections.editBloodTest":"inspections.createBloodTest")}>
                <GeneralBloodTestForm
                    onSubmit={onSubmit}
                    animalId={animalId as number}
                    defaultValues={editedItem?editedItem:(animalId?generalBloodTestValues(animalId as number):undefined)} />
            </Drawer>
        </div>
    )
}