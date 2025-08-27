'use client'

import { useMemo, useState } from 'react'
import type { Disease } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useDiseaseTypes } from "@/shared/hooks/queries"
import { createDiseaseColums } from '@/entities/diseases'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { DiseaseForm, DiseaseSchema } from '@/features/diseases'
import { useGetDiseases } from '@/entities/diseases/services/queries'
import { useCreateInspection } from '@/entities/inspections/services/mutations'
import { InspectionForm, InspectionSchema, inspectionValuesWithDisease } from '@/features/inspections'
import { useCreateDisease, useDeleteDisease, useUpdateDisease } from '@/entities/diseases/services/mutations'
// TODO: fix
export default function Diseases() {
    const { t } = useI18n()
    const { diseaseTypes } = useDiseaseTypes()
    const [animalId, setAnimalId] = useState<number|null>(null)
    const [diseaseId, setDiseaseId] = useState<number|null>(null)
    const createInspection = useCreateInspection()

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Disease, DiseaseSchema, DiseaseSchema>({
        createMutation:  useCreateDisease,
        updateMutation: useUpdateDisease,
        removeMutation: useDeleteDisease,
    })

    async function handleCreateInspection(values: InspectionSchema) {
        try {
            await createInspection.mutateAsync(values)
            setAnimalId(null)
            setDiseaseId(null)
        } catch (error) {
            console.log(error)            
        }
    }

    const handleSetDisease = (id: number, animalId: number) => {
        setDiseaseId(id)
        setAnimalId(animalId)
    }

    const columns = useMemo(() => createDiseaseColums(handleEditItem, handleDelete, handleSetDisease, t), [handleEditItem, handleDelete, handleSetDisease])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetDiseases}
                topSlot={createButton(t("inspections.createDisease"))} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem?"inspections.editDisease":"inspections.createDisease")}>
                <DiseaseForm defaultValues={editedItem?(editedItem as any):undefined} diseaseTypes={diseaseTypes} onSubmit={onSubmit} />
            </Drawer>

            <Drawer
                open={diseaseId !== null}
                onClose={() => setDiseaseId(null)}
                title={t("inspections.createInspection")}>
                <InspectionForm type="DISEASE" defaultValues={ editedItem ? { ...inspectionValuesWithDisease, diseaseId: editedItem.id, animalId, type: "DISEASE" } : undefined as any } onSubmit={handleCreateInspection} />
            </Drawer>
        </div>
    )
}