'use client'

import { useMemo } from 'react'
import { UrineTest } from '@/shared/types'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createUrineTestColums } from '@/entities/urine-tests'
import { useDiseases, useUrineColors } from "@/shared/hooks/queries"
import { useSearchQueryParams } from '@/shared/hooks/use-query-params'
import { useGetUrineTests } from '@/entities/urine-tests/services/queries'
import { UrineTestForm, UrineTestSchema, urineTestValues } from '@/features/urine-tests'
import { useCreateUrineTest, useDeleteUrineTest, useUpdateUrineTest } from '@/entities/urine-tests/services/mutations'
// TODO: fix 
export default function UrineTests() {
    const { t, locale } = useI18n()
    const { get, set, remove } = useSearchQueryParams()

    const newAnimal = get('new')
    const animalId = get('animalId', true)
    
    const { diseases } = useDiseases()
    const { urineColors } = useUrineColors()

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<UrineTest, UrineTestSchema, UrineTestSchema>({
        dialogValue: !!newAnimal,
        createMutation: useCreateUrineTest,
        updateMutation: useUpdateUrineTest,
        removeMutation: useDeleteUrineTest,
        extraOnClose: () => newAnimal && (animalId ? set('animalId', animalId) : remove('animalId'))
    })

    const columns = useMemo(() => createUrineTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetUrineTests}
                topSlot={createButton(t("inspections.createUrineTest"))} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem?"inspections.editUrineTest":"inspections.createUrineTest")}>
                <UrineTestForm
                    onSubmit={onSubmit}
                    diseases={diseases}
                    urineColors={urineColors}
                    defaultValues={editedItem?editedItem:(animalId?{...urineTestValues,animalId}:undefined) as any} />
            </Drawer>
        </div>
    )
}