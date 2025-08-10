'use client'

import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Disease } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { Button } from '@/shared/components/ui/button'
import { useDiseaseTypes } from "@/shared/hooks/queries"
import { createDiseaseColums } from '@/entities/diseases'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { DiseaseForm, DiseaseSchema } from '@/features/diseases'
import { InspectionForm, InspectionSchema, inspectionValuesWithDisease } from '@/features/inspections'
import { inspectionsControllerCreate, diseasesControllerCreate, diseasesControllerRemove, diseasesControllerUpdate, diseasesControllerFindAll } from '@/shared/api'

export default function Diseases() {
    const { t } = useI18n()
    const { diseaseTypes } = useDiseaseTypes()
    const [animalId, setAnimalId] = useState<number|null>(null)
    const [diseaseId, setDiseaseId] = useState<number|null>(null)

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Disease, DiseaseSchema, DiseaseSchema>({
        findAll: diseasesControllerFindAll,
        create:  diseasesControllerCreate as any,
        remove: diseasesControllerRemove,
        update: diseasesControllerUpdate,
    })

    async function handleCreateInspection(values: InspectionSchema) {
        try {
            await inspectionsControllerCreate(values as any)
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
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("inspections.createDisease")}
                </Button>} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"inspections.editDisease":"inspections.createDisease")}>
                <DiseaseForm diseaseTypes={diseaseTypes} onSubmit={onSubmit} />
            </Drawer>

            <Drawer
                open={diseaseId !== null}
                onClose={() => setDiseaseId(null)}
                title={t("inspections.createInspection")}>
                <InspectionForm type="DISEASE" defaultValues={ diseaseId ? { ...inspectionValuesWithDisease, diseaseId, animalId, type: "DISEASE" } : undefined as any } onSubmit={handleCreateInspection} />
            </Drawer>
        </div>
    )
}