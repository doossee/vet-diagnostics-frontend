'use client'

import { useMemo } from 'react'
import type { DungTest } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createDungTestColums } from '@/entities/dung-tests'
import { useDiseases, useDungColors } from "@/shared/hooks/queries"
import { useSearchQueryParams } from '@/shared/hooks/use-query-params'
import { useGetDungTests } from '@/entities/dung-tests/services/queries'
import { DungTestForm, DungTestSchema, dungTestValues } from '@/features/dung-tests'
import { useCreateDungTest, useDeleteDungTest, useUpdateDungTest } from '@/entities/dung-tests/services/mutations'
// TODO: fix
export default function DungTests() {
    const { t, locale } = useI18n()
    const { get, set, remove } = useSearchQueryParams()
    const newAnimal = get('new')
    const animalId = get('animalId', true)    

    const { diseases } = useDiseases()
    const { dungColors } = useDungColors()

    const { dialog, createButton, editedItem, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<DungTest, DungTestSchema, DungTestSchema>({
        dialogValue: !!newAnimal,
        createMutation: useCreateDungTest,
        removeMutation: useDeleteDungTest,
        updateMutation: useUpdateDungTest,
        extraOnClose: () => newAnimal && (animalId ? set('animalId', animalId) : remove('animalId'))
    })

    const columns = useMemo(() => createDungTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetDungTests}
                topSlot={createButton(t("inspections.createDungTest"))} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem?"inspections.editDungTest":"inspections.createDungTest")}>
                <DungTestForm
                    onSubmit={onSubmit}
                    diseases={diseases}
                    dungColors={dungColors}
                    defaultValues={editedItem?editedItem:(animalId?{...dungTestValues, animalId}:undefined) as any}/>
            </Drawer>
        </div>
    )
}